/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import styled from '@emotion/styled';
import deleteLogo from '../assets/delete.png';
import { useDispatch } from 'react-redux';
import { fetchDeletePlots } from '../feature/plot/plotSlice';

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  background-color: #0000004f;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
`

// eslint-disable-next-line react/prop-types
function GroupItem({ id }) {
  const dispatch = useDispatch();
  const handleClick = useCallback(e => {
    dispatch(fetchDeletePlots(id));
  }, [dispatch, id]);
  return (
    <Item>
      <div>
        <p>{id}</p>
      </div>
      <div>
        <div onClick={handleClick} style={{ width: "2rem", height: "2rem" }}>
          <img style={{ width: "100%", height: "100%" }} src={deleteLogo} alt="delete" />
        </div>
      </div>


    </Item>

  )
}

export default React.memo(GroupItem)
