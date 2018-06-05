import React from 'react';
import { observer, inject } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';
import { withRouter } from 'react-router-dom'

import Header from './Header'
import Body from './Body'
import EditBody from './EditBody'
import AddedItems from './AddedItems'

const App = (props) => (
    <div  className="app">

        <Header/>

        {props.userStore.editMode ? <EditBody /> : <Body />}


        <AddedItems/>
    </div>
)

export default withRouter(inject('userStore', 'selectedItemsStore', 'cpuStore', 'editingItemStore')(observer(App)))
// <DevTools />
