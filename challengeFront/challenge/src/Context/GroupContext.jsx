import React, { createContext,  useState } from 'react'

const GroupContext = createContext();
function GroupProvider ({children}){

  const [Groups, setGroups] = useState([]);
  const [Group, setGroup] = useState({
    groupName: '',
    companyName: ''
  });

  const ClearFields = () =>{
    setGroup({
      groupName: '',
      companyName: ''
    })
  }


  const [updateContext, setUpdateContext] = useState(1);





  return (
    <GroupContext.Provider
        value={{
          Group, setGroup,
          ClearFields,
          Groups, setGroups,
          updateContext, setUpdateContext
        }}
    >
        {children}
    </GroupContext.Provider>
  )
}

export {GroupContext, GroupProvider}