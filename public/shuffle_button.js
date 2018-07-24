'use strict';

const e = React.createElement;

class ShuffleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, items: [], startIndex: 0, status: 'Initialized', sorted: false };

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    this.initArray = function() {
      var items = [];
      for (var i = 0; i < 10; i++) {
        this.state.items[i] = getRandomInt(100);
      }
    }

    this.initArray();

    /**
     * Bubble sort algorithm
     */
    this.bubbleSort = function bubbleSort(array) {

      var status = 'not swapped';

      var i = this.state.startIndex;

      if (i > array.length) i = 0;

      if (array[i] && array[i + 1] && array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        status = 'swapped';
      }

      i++;

      var sorted = true;

      // check if array is fully sorted
      for (var j = 0; j < array.length; j++) {
        if (array[j] && array[j + 1] && array[j] > array[j + 1]) {
          sorted = false;
          break;
        }
      }

      if (sorted) status = 'Sorted';

      this.setState({
        startIndex: i,
        items: array,
        sorted: sorted,
        status: status
      });
    }

    this.shuffleArray = function() {
      var items = [];
      for (var i = 0; i < 10; i++) {
        items[i] = getRandomInt(100);
      }
      this.setState({
        items: items,
        startIndex: 0,
        sorted: false,
        status: 'Initialized'
      });
    }

    this.step = function() {
      var items = this.state.items;
      if (this.state.sorted === true) {
        clearInterval(this.state.interval);
        return;
      }
      
      this.bubbleSort(items);
      
    };

    this.play = function() {
      var me = this;
      this.state.interval = setInterval(function() { me.step(); }, 1000);
    }
  }

  render() {

    const listItems = this.state.items.map((number, index) => 
      <div className="row" key={index}>
        <div className="col-">
            {index}
          </div>
          <div className="col-lg">
            <div style={{backgroundColor: 'black', width: number + '%', height: '15px'}}></div>
          </div>
          <div className="col-">
            {number}
          </div>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-">
            Status: {this.state.status}
          </div>
        </div>
        {listItems}
        <div className="row">
          <div className="col-">
              <button onClick={() => this.shuffleArray()}>
                Shuffle
              </button>
            </div>
            <div className="col-">
              <button onClick={() => this.step()} disabled={this.state.sorted}>
                Step
              </button>
            </div>
            <div className="col-">
              <button onClick={() => this.play()} disabled={this.state.sorted}>
                Play
              </button>
            </div>
        </div>
      </div>
    );

  }

}

const domContainer = document.querySelector('#shuffle_button_container');
ReactDOM.render(e(ShuffleButton), domContainer);