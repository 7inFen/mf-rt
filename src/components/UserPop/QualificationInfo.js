import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQualificationInfo } from '../../actions/auth'
import { Row, Col, Spin } from 'antd'
import styled from 'styled-components'
import { layout } from './layout'

const Wrap = styled.div`
  & > .ant-row {
    margin-bottom: 15px;
    & > .ant-col:nth-child(1) {
      text-align: right;
    }
  }
`
const StyledImg = styled.img`
  max-width: 200px;
  height: auto;
`

const ColLabel = props => <Col {...layout.labelCol} {...props} />
const ColWrapper = props => <Col {...layout.wrapperCol} {...props} />

export default function QualificationInfo () {
  const dispatch = useDispatch()
  const info = useSelector(state => state.auth?.qualificationInfo)
  const { init, loading } = info
  const {
    company = '',
    license = '',
    // evidence_type值同src\pages\signup\QualificationInformation.js中定义
    evidence_type = '1',
    agent_file = '',
    id_card_front = '',
    id_card_back = '',
    created_at = '',
    audited_at = ''
  } = info?.data || {}

  const isAgentFile = evidence_type === '1'

  useEffect(() => {
    if (!init) {
      dispatch(
        getQualificationInfo()
      )
    }
  }, [])
  return (
    <Spin spinning={loading}>
      <Wrap>
        <Row>
          <ColLabel>
          公司名称：
          </ColLabel>
          <ColWrapper>
            {company}
          </ColWrapper>
        </Row>
        <Row>
          <ColLabel>
          营业执照：
          </ColLabel>
          <ColWrapper>
            <StyledImg src={license} />
          </ColWrapper>
        </Row>
        <Row>
          <ColLabel>
            {
              isAgentFile ? '授权证明：' : '法人身份证：'
            }
          </ColLabel>
          <ColWrapper>
            {
              isAgentFile ? (
                <StyledImg src={agent_file} />
              ) : (
                <Row>
                  <Col span={12}>
                    <StyledImg src={id_card_front} />
                  </Col>
                  <Col span={12}>
                    <StyledImg src={id_card_back} />
                  </Col>
                </Row>
              )
            }
          </ColWrapper>
        </Row>
        <Row>
          <ColLabel>
          提审时间：
          </ColLabel>
          <ColWrapper>
            {created_at}
          </ColWrapper>
        </Row>
        <Row>
          <ColLabel>
          审核时间：
          </ColLabel>
          <ColWrapper>
            {audited_at}
          </ColWrapper>
        </Row>
      </Wrap>
    </Spin>
  )
}

QualificationInfo.propTypes = {

}
