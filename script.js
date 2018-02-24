Vue.component('star-rating', VueStarRating.default);
var app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {},
    loading: true,
        addedName: '',
    addedComment: '',
      commentDate: '',
    comments: {},
      rating: 0,
      total: {},
      ratingNumber: {},
      averageRating: {},
  },
  created: function() {
    this.xkcd();
  },
    computed: {
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
	return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
     watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
	this.max = value;
      } else {
	this.xkcd();
      }
    },
  },
  methods: {
     xkcd: function() {
      this.loading = true;
      fetch('https://xkcd.now.sh/' + this.number).then(response => {
	return response.json();
      }).then(json => {
          this.current = json;
          this.loading = false;
          console.log(json);
          this.number = json.num;
          return true;
     }).catch(err => {
	this.number = this.max;
      });
    },
      previousComic: function() {
      this.number = this.current.num - 1;
    },
    nextComic: function() {
      this.number = this.current.num + 1;
    },
      getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
    },
    randomComic: function() {
      this.number = this.getRandom(1,this.max);
    },
      firstComic: function() {
          this.number = 1;
      },
      lastComic: function(){
        this.number = this.max;  
      },
      addComment: function() {
      if (!(this.number in this.comments))
	Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({author:this.addedName,text:this.addedComment, time:Date()});
      this.addedName = '';
      this.addedComment = '';
          
    },
        addRating: function(){
            this.numberRatings = this.numberRatings+1;
            if(!(this.number in this.averageRating)){
               // console.log("hello");
               Vue.set(app.averageRating,this.number, 0);
                this.ratingNumber[this.number] = 0;
                this.total[this.number]=0;
            }
            this.total[this.number] =this.total[this.number] +this.rating 
            this.ratingNumber[this.number] = this.ratingNumber[this.number] +1;
           // console.log(this.ratingNumber[this.number]);
           // console.log(this.total[this.number]);
           // console.log(this.averageRating[this.number])
            this.averageRating[this.number] = (this.total[this.number]/this.ratingNumber[this.number]);
        },
  }
    
});