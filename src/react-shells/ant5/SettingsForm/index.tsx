import { CSSProperties, memo, useCallback, useMemo } from "react"
import { useCurrentNode } from "core-react/hooks/useCurrentNode"
import { Input, InputNumber, Radio, Select, Switch } from 'antd';
import { ComponentRender } from "core-react/ComponentRender";
import { Tabs } from "./components/Tabs";
import { TabPanel } from "./components/Tabs/TabPanel";
import { INodeMeta } from "core";
import { MetaForm } from "./MetaForm";
import { Fieldy, VirtualForm } from "fieldy";
import { extractFieldSchemas } from "./extractFieldSchemas";
import { useDesignerEngine } from "core-react/hooks";
import { Box } from "../components/Box";
import { PreviewRoot } from "core-react/PreviewRoot";
import { useChangeNodeMeta } from "core-react/hooks/useChangeNodeMeta";
import { SlotSwitch } from "./components/SlotSwitch";
import { FormItem } from "./components/FormItem";
import { useLanguage } from "core-react/hooks/useLanguage";
import { Fold, FoldBase, FoldExtra } from "./components/Fold";
import { FoldExtraItem } from "./components/Fold/FoldExtraItem";
import { FontSelect } from "./components/font/FontSelect";
import { ColorInput } from "./components/ColorInput";
import { SizeInput } from "./components/SizeInput";
import { FontColorInput } from "./components/font/FontColorInput";
import { FontDecorationSelect } from "./components/font/FontDecorationSelect";
import { FontLineHeightInput } from "./components/font/FontLineHeightInput";
import { FontStyleSelect } from "./components/font/FontStyleSelect";
import { FontWeightInput } from "./components/font/FontWeightInput";
import { TextAlignSelect } from "./components/font/TextAlignSelect";
import { FontSizeInput } from "./components/font/FontSizeInput";

const propertiesStyle: CSSProperties = {
  flex: 1,
  height: 0,
  width: "100%",
}

export interface SettingsFormProps {
  //children?: React.ReactNode
}

export const SettingsForm = memo((props: SettingsFormProps) => {
  const engine = useDesignerEngine()
  const currentNode = useCurrentNode()
  const changeMeta = useChangeNodeMeta()
  const lang = useLanguage()
  
  const designerSchema = useMemo(() => {
    if (currentNode && currentNode.designerSchema) {
      //翻译
      return engine?.getLoacalesManager()
        .translateDesignerSchema(currentNode?.meta.componentName,
          JSON.parse(JSON.stringify(currentNode.designerSchema))
        )
    } else {
      return undefined
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, engine, lang])

  const fieldSchemas = useMemo(() => {
    if (designerSchema) {
      return designerSchema ? extractFieldSchemas(designerSchema) : []
    }
    return undefined
  }, [designerSchema])

  const handleMetaChange = useCallback((meta: INodeMeta) => {
    if (currentNode) {
      changeMeta(currentNode.id, meta)
    }
  }, [changeMeta, currentNode])

  return (
    <PreviewRoot
      components={{
        Tabs,
        TabPanel,
        FormItem,
        Input,
        Select,
        Switch,
        SlotSwitch,
        Fold,
        FoldBase,
        FoldExtra,
        FoldExtraItem,
        Radio,
        InputNumber,
        ColorInput,
        SizeInput,
        FontSelect,
        FontColorInput,
        FontDecorationSelect,
        FontSizeInput,
        FontLineHeightInput,
        FontStyleSelect,
        FontWeightInput,
        TextAlignSelect
      }}
    >

      <Fieldy>
        <Box style={propertiesStyle} {...props}>
          {
            fieldSchemas && currentNode &&
            <VirtualForm
              fieldSchemas={fieldSchemas}
              initialValue={currentNode?.meta}
              onValueChange={handleMetaChange}
            >
              <MetaForm>
                {
                  designerSchema &&
                  <ComponentRender
                    root={designerSchema}
                  />
                }
              </MetaForm>
            </VirtualForm>
          }
        </Box>
      </Fieldy>
    </PreviewRoot>
  )
})