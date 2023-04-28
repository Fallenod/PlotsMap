/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styled from '@emotion/styled';
import GroupItem from './GroupItem';

const Block = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 600px;
  height: 100%;
  padding: 0 1rem;
`

function GroupBlock({ data }) {
    return (
        <Block >
            {data && data.map((item) => (
                <GroupItem key={item.id} id={item.identificator} />
            ))}
        </Block>

    )
}

export default React.memo(GroupBlock)
