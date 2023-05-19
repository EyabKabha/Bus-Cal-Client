import React from 'react';
import '../assets/style.css'
export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
           
                <footer id="main-footer" class="bg-dark text-white mt-5">
                    {/* <div class="container" id="checkFooter"> */}
                        {/* <div class="row"> */}
                            {/* <div class="col"> */}
                               

                                <p class="lead text-center">
                                  נתקעת ? נשמח לעזור לך!
                                         </p>
                                     
                                <p id="phoneColor" class="lead text-center">
                                   
                                   073-3988700
                                         </p>
                                         <p id="year" class="lead text-center">
                                    Copyright &copy;
                                  {/* <span id="year"></span> */}
                                         BusCal {new Date().getFullYear()}
                                         </p>
                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                </footer>
           
        )
    }
}

