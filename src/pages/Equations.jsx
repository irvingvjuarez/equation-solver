import React from "react"
import Results from "../components/Results"
import Loader from "../components/Loader"

import chosenPage from "../utils/chosenPage"
import interpreter from "../utils/interpreter"
import resolveErrors from "../utils/resolveErrors"

const regExp = /[\da-zA-Z\)]+\s?\=\s?[\(\da-zA-Z\-]+/

class Equations extends React.Component {
    constructor(props){
        super(props)
        this.state = { enabled: false, equation: "", loading: null, error: null, equationVarSide: "", equationNumSide: "" }

        this.handlerChange = this.handlerChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTryAgainBtn = this.handleTryAgainBtn.bind(this);
    }

    componentDidMount(){
        this.input = document.querySelector(".equations input")
        this.interpretation = document.querySelector(".equations__interpretation")
        this.doMathBtn = document.querySelector(".equations button")
        chosenPage("Equations")
    }

    handleClick = () => {
        this.setState({ loading: true })

        resolveErrors(this.state.equation, this)
    }

    handlerChange = e => {
        let result, content = e.target.value

        if(content.match(regExp)){ 
            result = true 
        }else{ 
            result = false 
        }

        this.setState({ enabled: result, equation: content })
        this.interpretation.innerHTML = interpreter(content)
    }

    handleTryAgainBtn = () => {
        this.input.value = ""
        this.interpretation.textContent = "."
        this.setState({
            enabled: false, equation: "", loading: null, error: null, equationVarSide: "", equationNumSide: ""
        })
    }

    renderBtn = () => {
        if(!this.state.enabled || this.state.loading === false){
            return( <button className="equations__doMathBtn nonAbled" disabled>Do the math</button> )
        }else if(this.state.enabled){
            return( <button className="equations__doMathBtn abled" onClick={this.handleClick}>Do the math</button> )
        }
    }

    renderTryAgainBtn = () => {
        if(this.state.loading === false){
            return(
                <button className="equations__tryAgainBtn abled" onClick={this.handleTryAgainBtn}>Try again</button>
            )
        }else{
            return(
                <button disabled className="nonAbled">Try again</button>
            )
        }
    }

    renderResults = () => {
        if(this.state.error){
            return( <h2 className="error-msg">Error: {this.state.error.message}</h2> )
        }else if(this.state.loading === null){
            return( <div></div> )
        }else if(this.state.loading){
            return( <Loader />)
        }else{
            return( <Results varSide={this.state.equationVarSide} numSide={this.state.equationNumSide}/>)
        }
    }

    render(){
        return(
            <section className="equations">
                <h2>Write a linear equation</h2>
                <input type="text" placeholder="E.g: 2x + 10 = 23x + 120" onChange={this.handlerChange}/>
                <div className="equations__interpretation">.</div>
                {this.renderBtn()}
                {this.renderTryAgainBtn()}
                {this.renderResults()}
            </section>
        )
    }
}

export default Equations