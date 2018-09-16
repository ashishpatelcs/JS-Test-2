window.onload = () => {
    function fetchJSON(callback) {
        const data = TABLE_DATA;
        callback(data);
    }

    var random = document.getElementById("start");
    var randomList;
    random.onclick = ()=> {
        randomList = window.setInterval(shuffleNodes, 1000);
        //shuffleNodes();
    }

    var stop = document.getElementById("stop");
    stop.onclick = ()=> {
        window.clearInterval(randomList);
    }

    var sortButton = document.getElementById("sort");
    sortButton.onclick = ()=> {
        sortTable();
    }

    fetchJSON((e) => {
        const table = document.getElementsByTagName("tbody");
        e.forEach((obj)=> {
            let trNode = document.createElement("tr");
            for (let key in obj) {
                if (key == 'thumbnailUrl') {
                    let keyNode = document.createElement("td");
                    let imgNode = document.createElement("img");
                    imgNode.src = obj[key];
                    keyNode.appendChild(imgNode);
                    trNode.appendChild(keyNode);

                } else {
                    let keyNode = document.createElement("td");
                    keyNode.textContent = obj[key];
                    trNode.appendChild(keyNode);
                }
            }
            table[0].appendChild(trNode);
        })
    })

    function sortTable() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementsByTagName("tbody");
        switching = true;
        
        while (switching) {
            
          switching = false;
          rows = table[0].rows;
          
          for (i = 0; i < (rows.length - 1); i++) {
              
            shouldSwitch = false;
            
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];
            
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
              
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }

      function shuffle(items)
        {
            var cached = items.slice(0), temp, i = cached.length, rand;
            while(--i)
            {
                rand = Math.floor(i * Math.random());
                temp = cached[rand];
                cached[rand] = cached[i];
                cached[i] = temp;
            }
            return cached;
        }

        function shuffleNodes()
        {
            var list = document.getElementsByTagName("tbody");
            nodes = list[0].children;
            var i = 0;
            nodes = Array.prototype.slice.call(nodes);
            nodes = shuffle(nodes);
            while(i < nodes.length)
            {
                list[0].appendChild(nodes[i]);
                ++i;
            }
        }
}