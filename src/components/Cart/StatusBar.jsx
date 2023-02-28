const StatusBar = ({status}) => {
    return (
        <div id="StatusBar">
            <button className="close-x">X</button>
            <div className="img-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6745/6745042.png"
                alt="hazard sign"
              />
            </div>
            <div className="text-container">
              <p className="text-status">{status}</p>
              <p className="text-item">Floral Print Wrap Dress, Orange, 38</p>
            </div>
        </div>
    );
}

export default StatusBar;