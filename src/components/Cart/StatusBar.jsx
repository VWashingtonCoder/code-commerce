const StatusBar = ({ top, item }) => {
    return (
        <div id="StatusBar">
            <button className="close-x icon-btn">X</button>
            <div className="img-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6745/6745042.png"
                alt="hazard sign"
              />
            </div>
            <div className="text-container">
              <p className="text-status">{top}</p>
              <p className="text-item">{item}</p>
            </div>
        </div>
    );
}

export default StatusBar;