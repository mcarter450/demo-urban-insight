'use strict';

const e = React.createElement;

class BubblesortComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      startIndex: 0, 
      status: 'Initialized', 
      sorted: false,
      operation: 0,
      play: false
    };

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    this.swap = function(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      var $ = jQuery;

      // animate corresponding bars
      $('.bar-'+ i).animate({opacity: 0.25}, 400, 'swing', function() {
        $(this).animate({opacity: 1}, 400, 'swing');
      });
      $('.bar-'+ j).animate({opacity: 0.25}, 400, 'swing', function() {
        $(this).animate({opacity: 1}, 400, 'swing');
      });
    };

    this.initArray = function() {
      var items = [];
      for (var i = 0; i < 10; i++) {
        this.state.items[i] = getRandomInt(100);
      }
    };

    this.initArray();

    /**
     * Bubble sort algorithm
     */
    this.bubbleSort = function bubbleSort(array, callback) {

      var status = 'not swapped';

      var i = this.state.startIndex;

      var operation = this.state.operation;

      operation++;

      if (i > array.length) i = 0;

      if (array[i] && array[i + 1] && array[i] < array[i + 1]) {
        this.swap(array, i, i + 1);
        status = 'swapped';
      }

      i++;

      var sorted = true;

      // check if array is fully sorted -- some performance impact here
      for (var j = 0; j < array.length; j++) {
        if (array[j] && array[j + 1] && array[j] < array[j + 1]) {
          sorted = false;
          break;
        }
      }

      if (sorted) status = 'Sorted';

      this.setState({
        startIndex: i,
        items: array,
        sorted: sorted,
        status: status,
        operation: operation
      });

      callback();
    };

    this.shuffleArray = function() {
      var items = [];
      for (var i = 0; i < 10; i++) {
        items[i] = getRandomInt(100);
      }

      this.setState({
        items: items,
        startIndex: 0,
        sorted: false,
        status: 'Initialized',
        operation: 0,
        play: false
      });
    };

    // change sort direction after completion
    this.toggleSort = function() {
      var items = this.state.items;
      items.reverse();
      this.setState({items: items});
    };

    /**
     * Perform single sort operation
     */
    this.step = function() {
      var items = this.state.items;
      if (this.state.sorted === true) {
        return;
      }
      var me = this;
      this.bubbleSort(items, function() {
        if (me.state.play === true) {
          setTimeout(function() { me.step(); }, 1500);
        }
      });
    };

    this.play = function() {
      this.state.play = true;
      this.step();
    };
  }

  render() {

    const listItems = this.state.items.map((number, index) => 
      <div className="row" key={index}>
        <div className="col col-sm-1">
            {index}
          </div>
          <div className="col col-sm-10">
            <div className={'bar-' + index} style={{backgroundColor: 'black', width: number + '%', height: '15px', minWidth: '1%'}}></div>
          </div>
          <div className="col col-sm-1">
            {number}
          </div>
      </div>
    );

    return (
      <div className="container">
        <h2>Bubble Sort Simulator</h2>
        <div className="row">
          <div className="col-sm">
            <strong>Status:</strong> {this.state.status}, <strong>Operation:</strong> {this.state.operation}
          </div>
        </div>
        <div className="row">
          <div className="col col-sm-11">
              <strong>Index</strong>
            </div>
            <div className="col col-sm-1">
              <strong>Number</strong>
            </div>
        </div>
        {listItems}
        <div className="row">
          <div className="col col-sm-1"></div>
          <div className="col col-sm-9">
            <button className="btn btn-primary" onClick={() => this.shuffleArray()}>
              Shuffle
            </button> 
            <button className="btn btn-primary" onClick={() => this.step()} disabled={this.state.sorted}>
              Step
            </button> 
            <button className="btn btn-primary" onClick={() => this.play()} disabled={this.state.sorted}>
              Play
            </button> 
          </div>
          <div className="col col-sm-2">
            <button className="btn btn-secondary" onClick={() => this.toggleSort()} disabled={!this.state.sorted}>
              Sort
            </button>
          </div>
        </div>
      </div>
    );

  }

}

const domContainer = document.querySelector('#bubblesort_component_container');
ReactDOM.render(e(BubblesortComponent), domContainer);