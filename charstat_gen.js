function AS_gen() {
    //grab user selections
      var race_ID = Number(race_id.value); 
      var theme_ID = Number(theme_id.value);
      //var pb_array = [Number(str_pb.value),Number(dex_pb.value),Number(con_pb.value),Number(int_pb.value),Number(wis_pb.value),Number(cha_pb.value)];
      
      //declare other variables
      var race_array;
      var theme_array;
      var total_array;
      var base_array = [10,10,10,10,10,10];
      var mod_array = [0,0,0,0,0,0];
      var themeless_input = 6; //Number(themeless_ab.value)
      var i;
      
      //create race array by checking race_id against race_index
      function race_AS () {
          var race_index = [[0,2,0,2,0,-2],[0,0,0,0,0,0],[2,0,0,-2,2,0],[0,0,-2,2,0,2],
          [2,0,0,0,-2,2],[0,0,2,0,2,-2],[2,0,2,-2,0,0],[-2,2,0,2,0,0],[0,2,-2,0,0,2],[0,2,2,-2,0,0],
          [0,0,2,0,-2,2],[0,-2,2,0,2,0],[0,2,0,0,0,0],[2,0,0,0,0,0],[0,2,0,2,0,-2]];
          race_array = race_index[race_ID-1];
      }
  
      race_AS ();
  
      //create theme array by checking theme_id against theme_index
      function theme_AS () {
          theme_array = [0,0,0,0,0,0];
          var theme_index = [2,3,6,1,2,5,4,3,6,5,4,5,6,3,4,6,2,3,6,5,4,4,3,themeless_input];
          theme_array[theme_index[theme_ID-1]-1]++;
      }
      
      theme_AS();
  
      //create total array by summing race, theme, point buy, and base arrays
      function total_AS () {
          total_array = [0,0,0,0,0,0]
          var ab_label = ["str","dex","con","int","wis","cha"]
          i = 0;
          for (i = 0; i < 6; i++) {
              total_array[i] = base_array[i] + theme_array[i] + race_array[i]; // + pb_array[i];
              mod_array[i] = Math.floor((total_array[i] - 10) / 2);
              document.getElementById(ab_label[i]+"_score").value = total_array[i];
              document.getElementById(ab_label[i]+"_mod").value = mod_array[i];}
      }
      
      total_AS();
  
    }
  