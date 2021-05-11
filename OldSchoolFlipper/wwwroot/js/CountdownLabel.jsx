class CountdownLabel extends React.Component {
    IntervalTickHandler() {
        var secondsRemaining = this.state.SecondsUntilUpdate - 1;
        if (secondsRemaining == 0) {
            this.props.CountdownCompleteHandler();
            this.setState({ SecondsUntilUpdate: this.props.IntervalTime });
        }
        else {
            this.setState({ SecondsUntilUpdate: secondsRemaining });
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            SecondsUntilUpdate: this.props.IntervalTime,
            FormattedLabel: this.props.LabelFormat,
            IntervalHandle: setInterval(() => this.IntervalTickHandler(),1000)
        }

        this.IntervalTickHandler = this.IntervalTickHandler.bind(this);
    }

    GetFormattedLabel() {
        var result = this.props.LabelFormat.replace("{0}", String(this.state.SecondsUntilUpdate) + " seconds");
        return result;
    }

    render() {
        return (<div>{this.GetFormattedLabel()}</div>)
    }
}