import React from "react";
import { runInThisContext } from "vm";
import { StreamService } from "../api/StreamService";
import { Context } from "../helpers/Context";

type MyState = { url : string};
type MyProps = {};

class Dashboard extends React.Component<MyProps, MyState> {
    streamService: StreamService    

    constructor(props: any) {
        super(props)
        this.streamService = new StreamService()
        this.checkIfStreamOpened()
    }

    render() {
        return(
            <React.Fragment>
               <h1></h1> 
            </React.Fragment>
        )
    }

    checkIfStreamOpened() {        
        const autoSaveInterval = setInterval(async () => {
            var bool = await this.streamService.checkIfStreamOpened()
            console.log(bool)
            if (bool) {
                this.streamService.startStream('Gaming')
                clearInterval(autoSaveInterval)                
            }
        }, 1000);
    }
}

export default Dashboard;