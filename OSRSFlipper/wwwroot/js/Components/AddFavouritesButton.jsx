class AddFavouritesButton extends React.Component {
    constructor(props) {
        super(props);

        LoadRequiredCSS(["Components/AddFavouritesButton.css"]);
    }

    ButtonClickedHandler() {
        const addFavouritesEndpoint = "/Favourites/SaveFavouriteItem";
    }

    render() {
        return <button className="actionLink" onClick={this.ButtonClickedHandler} />
    }
}