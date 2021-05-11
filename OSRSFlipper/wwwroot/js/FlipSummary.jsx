class FlipSummary extends React.Component {
    constructor(props) {
        super(props);

        this.state.AllFlips = [];

        window[this.props.WindowName] = this;
    }

    UpdateFlips(AllFlips) {
        this.setState({ AllFlips: AllFlips });
    }

    RenderLifetimeProfit() {
        

        
    }

    render() {
        { this.RenderLifetimeProfit() }
    }
}