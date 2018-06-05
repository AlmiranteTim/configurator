import React from 'react'
import { Route, Switch } from 'react-router-dom'

import EditCpu from './EditCpu'
import EditGpu from './EditGpu'
import EditRam from './EditRam'
import EditBp from './EditBp'
import EditMb from './EditMb'
import EditSo from './EditSo'
import EditSsd from './EditSsd'

const EditBody = props => (
  <Switch>
    <Route path="/cpu" component={EditCpu} />
    <Route path="/gpu" component={EditGpu} />
      <Route path="/ram" component={EditRam} />
      <Route path="/bp" component={EditBp} />
      <Route path="/mb" component={EditMb} />
      <Route path="/so" component={EditSo} />
      <Route path="/ssd" component={EditSsd} />
    <Route render={(props) => (<div></div>)} />
  </Switch>
)

export default EditBody
