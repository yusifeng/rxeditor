import { Collapse as AntdCollapse } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo } from "react";
import styled from "styled-components";
const { Panel } = AntdCollapse;

const StyledToolbox = styled.div`
  width: 160px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  overflow: auto;
`

const Collapse = styled(AntdCollapse)`
  border-radius: 0;
`

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const Toolbox = memo(() => {
  const t = useToolsTranslate()

  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={['1']} bordered={false}>
        <Panel header={t('ReactionsInput.basicReactions')} key="1">
          <p>{text}</p>
        </Panel>
        <Panel header={t('ReactionsInput.commonReactions')} key="2">
          <p>{text}</p>
        </Panel>
        <Panel header={t('ReactionsInput.componentControl')} key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </StyledToolbox>
  )
})