import "./ManageInfoOptions.css";

function ManageInfoOptions(){
    return(
        <>
            <div className="headerEhotel">
                <p className="eHotel">E-Hotel</p>
                <p className="bookingMadeEasy">Booking made easy</p>
            </div>

            <div className="textAndButtons">
                <div className="textOnly">
                    <p className="do">What would you like to do?</p>
                    <p className="manage">With E-Hotel, you can manage all your information: clients, employees, hotel chains, hotels and even rooms, all in one place!</p>
                </div>
                <div className="buttons">
                    <a className="update" href="/Update"><span className="u">Update</span> information</a>
                    <a className="insert" href="/Insert"><span className="u">Insert</span> information</a>
                    <a className="delete" href="/Delete"><span className="u">Delete</span> information</a>
                </div>
            </div>
        </>
    );
}

export default ManageInfoOptions;