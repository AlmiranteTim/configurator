import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Cpu from './Cpu'
import Gpu from './Gpu'
import Ram from './Ram'
import Bp from './Bp'
import Mb from './Mb'
import So from './So'
import Ssd from './Ssd'


const Body = (props) => (
    <Switch>
        <Route path="/cpu" component={Cpu}/>
        <Route path="/gpu" component={Gpu}/>
        <Route path="/ram" component={Ram}/>
        <Route path="/bp" component={Bp}/>
        <Route path="/mb" component={Mb}/>
        <Route path="/so" component={So}/>
        <Route path="/ssd" component={Ssd}/>
        <Route exact path="/" render={props => (<div></div>)}/>
    </Switch>
)

export default Body;
