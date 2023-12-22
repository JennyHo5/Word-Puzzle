function make() {
    let loc = 100
    return function(x) {
      loc *= 2
      return x + loc
    }
  }
  
  let action = make() //LINE 1
  console.log(action(8))  //LINE 2