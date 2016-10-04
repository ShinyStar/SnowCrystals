
///////////////////////
///SNOW CRYSTALS! :D///
///////////////////////

function createCrystal(initialW, initialH){
            var ctx=document.getElementById("canvas").getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var iterations=document.getElementById("iterations").value;

            var x=500, y=500, w=initialW, h=initialH;
            var sizes=[]; sizes.push({"w":w, "h":h});

            var p;
            var type;
            if(document.getElementById("type").value=="random"){
                p=Math.random();
                if(p>0.5){
                    type="dendrites";
                }else if (p>0.1){
                    type="stellar";
                }else{
                    type="decorations";
                }
            }else{
                type=document.getElementById("type").value;
            }

            var shape;
            if(document.getElementById("shape").value=="random"){
                p=Math.random();
                if(p>0.5){
                    shape="hexagon";
                }else if (p>0.2){
                    shape="star";
                }else{
                    shape="starN";
                }
            }else{
                shape=document.getElementById("shape").value;
            }

            if(type=="stellar"){
                for(i=0;i<iterations;i++){
                    w=Math.floor(rand(w/3,w/2)); h=Math.floor(rand(h/3,h/2));
                    sizes.push({"w":w,"h":h});
                }
                if(shape=="hexagon"){
                    stellar(x,y,sizes,0,iterations, "FFFFFF");
                }else if(shape=="star"){
                    stellarStar4(x,y,sizes,0,iterations, "FFFFFF");
                }else if(shape=="starN"){
                    stellarStarN(x,y,sizes,0,iterations,rand(2,20),"FFFFFF");
                }
            }else if(type=="decorations"){
                for(i=0;i<iterations;i++){
                    w=Math.floor(rand(w/10,w/5)); h=Math.floor(rand(h/3,h/2)); //Up to h*2 for crazy stuff
                    sizes.push({"w":w,"h":h});
                }
                if(shape=="hexagon"){
                    decorations(x,y,sizes,0,iterations, "FFFFFF", 0);
                }else if(shape=="star"){
                    decorationsStar4(x,y,sizes,0,iterations, "FFFFFF", 0);
                }else if(shape=="starN"){
                    dendritesStarN(x,y,sizes,0,iterations,rand(2,10),"FFFFFF",0);
                }
            }else if(type=="dendrites"){
                for(i=0;i<iterations;i++){
                    w=Math.floor(rand(w/5,w/3)); h=Math.floor(rand(h/3,h/2));
                    sizes.push({"w":w,"h":h});
                }
                if(shape=="hexagon"){
                    dendrites(x,y,sizes,0,iterations, "FFFFFF", 0);
                }else if(shape=="star"){
                    dendritesStar4(x,y,sizes,0,iterations, "FFFFFF", 0);
                }else if(shape=="starN"){
                    dendritesStarN(x,y,sizes,0,iterations,rand(2,10),"FFFFFF",0);
                }
            }
        }

        function crystalFromName(){
            var ctx=document.getElementById("canvas").getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var name=document.getElementById("name").value;
            name = name.replace(/\s/, '');
            var type, shape, w=500, h=500, n=name.length%10, iterations=5, x=500, y=500;           
            name=name.toUpperCase();
            var code=Math.abs(hashCode(name));
            while(name.length<8){
                name=name+name;
            }
            if (code%2==0){
                type = "dendrites";
            }else{
                type = "stellar";
            }
            if (code%3==0){
                shape = "hexagon";
            }else if(code%3==2){
                shape = "star4";
            }else{
                shape = "star";
            }
            var sizes=[]; sizes.push({"w":w, "h":h});
            var step;

            for(i=0;i<iterations;i++){
                w/=2; h/=2;
                wdiv=Math.ceil(Math.abs((name.charCodeAt(i+1)-name.charCodeAt(i))/10));
                hdiv=Math.ceil(Math.abs((name.charCodeAt(iterations-i-1)-name.charCodeAt(iterations-i))/10));
                if(wdiv==0){wdiv=1;} //No dividing by zero, thanks
                if(hdiv==0){hdiv=1;}
                w=w/wdiv;
                h=h/hdiv;
                sizes.push({"w":w,"h":h});
            }

            if(type=="stellar"){
                if(shape=="hexagon"){
                    stellar(x,y,sizes,0,iterations, "FFFFFF");
                }else if(shape=="star"){
                    stellarStarN(x,y,sizes,0,iterations,n,"FFFFFF",0);
                }else if(shape=="star4"){
                    stellarStar4(x,y,sizes,0,iterations,"FFFFFF",0);
                }
            }else if(type=="dendrites"){
                if(shape=="hexagon"){
                    dendrites(x,y,sizes,0,iterations, "FFFFFF", 0);
                }else if(shape=="star"){
                    dendritesStarN(x,y,sizes,0,iterations,n,"FFFFFF",0);
                }else if(shape=="star4"){
                    dendritesStar4(x,y,sizes,0,iterations,"FFFFFF",0);
                }
            }
            if(document.getElementById("showName").checked){
                ctx.fillStyle="#5F5FFF";
                ctx.textAlign="center";
                ctx.textBaseline="middle"
                ctx.font="30pt Verdana";
                ctx.fillText(document.getElementById("name").value,x,y);
                ctx.strokeStyle="#FFF";
                ctx.strokeText(document.getElementById("name").value,x,y);
            }

        }


        function stellar(x,y,sizes,i,iterations, color){
            if(i==iterations){return;}
            i++;
            var w=sizes[i].w; var h=sizes[i].h;
            drawHexagon(x,y,w, h, "#"+parseInt(color,16).toString(16));
            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            //All 6 vertices
            stellar(x,y-h/2,sizes,i,iterations, nextColor);
            stellar(x+w/2,y-h/4,sizes,i,iterations, nextColor);
            stellar(x+w/2,y+h/4,sizes,i,iterations, nextColor);
            stellar(x,y+h/2,sizes,i,iterations, nextColor);
            stellar(x-w/2,y+h/4,sizes,i,iterations, nextColor);
            stellar(x-w/2,y-h/4,sizes,i,iterations, nextColor);
        }

        //This is actually a buggy version of dendrites but the result looked kinda nice
        function decorations(x,y,sizes,i,iterations, color, rotation){
            if(i==iterations){return;}
            i++;
            var c=document.getElementById("canvas");
            var ctx=c.getContext("2d");

            var w=sizes[i].w; var h=sizes[i].h;
            ctx.translate(x, y);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-x, -y); 
            drawHexagon(x,y,w,h, "#"+parseInt(color,16).toString(16));
            ctx.translate(x, y);
            ctx.rotate(-(rotation*Math.PI/180));
            ctx.translate(-x, -y);

            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            decorations(x,y-h/2,sizes,i,iterations, nextColor, 0);
            decorations(x+w/2,y-h/4,sizes,i,iterations, nextColor, 60);
            decorations(x+w/2,y+h/4,sizes,i,iterations, nextColor, 120);
            decorations(x,y+h/2,sizes,i,iterations, nextColor, 180);
            decorations(x-w/2,y+h/4,sizes,i,iterations, nextColor, 240);
            decorations(x-w/2,y-h/4,sizes,i,iterations, nextColor, 300);
        }

        function dendrites(x,y,sizes,i,iterations, color, rotation){
            if(i==iterations){return;}
            i++;
            var c=document.getElementById("canvas");
            var ctx=c.getContext("2d");

            var w=sizes[i].w; var h=sizes[i].h;
            ctx.translate(x, y);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-x, -y); 
            drawHexagon(x,y,w,h, "#"+parseInt(color,16).toString(16));

            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            dendrites(x,y-h/2,sizes,i,iterations, nextColor, 0);
            dendrites(x+w/2,y-h/4,sizes,i,iterations, nextColor, 60);
            dendrites(x+w/2,y+h/4,sizes,i,iterations, nextColor, 120);
            dendrites(x,y+h/2,sizes,i,iterations, nextColor, 180);
            dendrites(x-w/2,y+h/4,sizes,i,iterations, nextColor, 240);
            dendrites(x-w/2,y-h/4,sizes,i,iterations, nextColor, 300);

            ctx.translate(x, y);
            ctx.rotate(-(rotation*Math.PI/180));
            ctx.translate(-x, -y);
        }

        function drawHexagon(x, y, w, h, color){ //x and y are in the center
            var canvas=document.getElementById("canvas");
            var ctx=canvas.getContext("2d");

            ctx.fillStyle=color;
            ctx.beginPath();
            ctx.moveTo(x,y-h/2);
            ctx.lineTo(x+w/2,y-h/4);
            ctx.lineTo(x+w/2,y+h/4);
            ctx.lineTo(x,y+h/2);
            ctx.lineTo(x-w/2,y+h/4);
            ctx.lineTo(x-w/2,y-h/4);
            ctx.closePath();
            ctx.fill();
        }

        //Staaaaars! :D
        function stellarStar4(x,y,sizes,i,iterations, color){
            if(i==iterations){return;}
            i++;
            var w=sizes[i].w; var h=sizes[i].h;
            drawStar4(x,y,w, h, "#"+parseInt(color,16).toString(16));
            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            stellarStar4(x,y-h/2,sizes,i,iterations, nextColor);
            stellarStar4(x+w/6, y-h/6,sizes,i,iterations, nextColor);
            stellarStar4(x+w/2, y,sizes,i,iterations, nextColor);
            stellarStar4(x+w/6, y+h/6,sizes,i,iterations, nextColor);
            stellarStar4(x, y+h/2,sizes,i,iterations, nextColor);
            stellarStar4(x-w/6, y+h/6,sizes,i,iterations, nextColor);
            stellarStar4(x-w/2, y,sizes,i,iterations, nextColor);
            stellarStar4(x-w/6, y-h/6,sizes,i,iterations, nextColor);
        }

        function decorationsStar4(x,y,sizes,i,iterations, color, rotation){
            if(i==iterations){return;}
            i++;
            var c=document.getElementById("canvas");
            var ctx=c.getContext("2d");

            var w=sizes[i].w; var h=sizes[i].h;
            ctx.translate(x, y);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-x, -y); 
            drawStar4(x,y,w, h, "#"+parseInt(color,16).toString(16));
            ctx.translate(x, y);
            ctx.rotate(-(rotation*Math.PI/180));
            ctx.translate(-x, -y);

            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            decorationsStar4(x,y-h/2,sizes,i,iterations, nextColor);
            decorationsStar4(x+w/6, y-h/6,sizes,i,iterations, nextColor);
            decorationsStar4(x+w/2, y,sizes,i,iterations, nextColor);
            decorationsStar4(x+w/6, y+h/6,sizes,i,iterations, nextColor);
            decorationsStar4(x, y+h/2,sizes,i,iterations, nextColor);
            decorationsStar4(x-w/6, y+h/6,sizes,i,iterations, nextColor);
            decorationsStar4(x-w/2, y,sizes,i,iterations, nextColor);
            decorationsStar4(x-w/6, y-h/6,sizes,i,iterations, nextColor);
        }

        function dendritesStar4(x,y,sizes,i,iterations, color, rotation){
            if(i==iterations){return;}
            i++;
            var c=document.getElementById("canvas");
            var ctx=c.getContext("2d");

            var w=sizes[i].w; var h=sizes[i].h;
            ctx.translate(x, y);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-x, -y); 
            drawStar4(x,y,w, h, "#"+parseInt(color,16).toString(16));

            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            dendritesStar4(x,y-h/2,sizes,i,iterations, nextColor,0);
            dendritesStar4(x+w/6, y-h/6,sizes,i,iterations, nextColor,45);
            dendritesStar4(x+w/2, y,sizes,i,iterations, nextColor,90);
            dendritesStar4(x+w/6, y+h/6,sizes,i,iterations, nextColor,135);
            dendritesStar4(x, y+h/2,sizes,i,iterations, nextColor,180);
            dendritesStar4(x-w/6, y+h/6,sizes,i,iterations, nextColor,225);
            dendritesStar4(x-w/2, y,sizes,i,iterations, nextColor,270);
            dendritesStar4(x-w/6, y-h/6,sizes,i,iterations, nextColor,315);

            ctx.translate(x, y);
            ctx.rotate(-(rotation*Math.PI/180));
            ctx.translate(-x, -y);
        }

        function drawStar4(x, y, w, h, color){
            var ctx=document.getElementById("canvas").getContext("2d");

            ctx.fillStyle=color;
            ctx.beginPath();
            ctx.moveTo(x, y-h/2);
            ctx.lineTo(x+w/6, y-h/6);
            ctx.lineTo(x+w/2, y);
            ctx.lineTo(x+w/6, y+h/6);
            ctx.lineTo(x, y+h/2);
            ctx.lineTo(x-w/6, y+h/6);
            ctx.lineTo(x-w/2, y);
            ctx.lineTo(x-w/6, y-h/6);
            ctx.closePath();
            ctx.fill();
        }

        //More stars! >u<
        function stellarStarN(x,y,sizes,i,iterations,n,color){
            var ctx=document.getElementById("canvas").getContext("2d");
            if(i==iterations){return;}
            i++;
            
            var w=sizes[i].w; var h=sizes[i].h;
            drawStarN(x,y,w, h,n, "#"+parseInt(color,16).toString(16));
            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            var rotation=360/(2*n);
            var j=0;
            if(iterations-i>0){
                for(j;j<2*n;j++){
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(rotation*j*Math.PI/180);
                    stellarStarN(0,-h*((j+1)%2),sizes,i,iterations,n,nextColor);
                    ctx.restore();
                }
            }
        }
        function dendritesStarN(x,y,sizes,i,iterations,n,color,rot){
            var ctx=document.getElementById("canvas").getContext("2d");
            if(i==iterations){return;}
            i++;
            
            var w=sizes[i].w; var h=sizes[i].h;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot*Math.PI/180);
            ctx.translate(-x, -y); 
            drawStarN(x,y,w, h,n, "#"+parseInt(color,16).toString(16));
            ctx.restore();
            if(document.getElementById("colored").checked){
                var nextColor=(parseInt(color,16)-parseInt("101000",16)).toString(16)
            }else{
                var nextColor="FFFFFF";
            }
            var rotation=360/(2*n);
            var j=0;
            if(iterations-i>0){
                for(j;j<2*n;j++){
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(rotation*j*Math.PI/180);
                    stellarStarN(0,-h*((j+1)%2),sizes,i,iterations,n,nextColor, rotation*j);
                    ctx.restore();
                }
            }
        }

        function drawStarN(x,y,w,h,n,color){
            var ctx=document.getElementById("canvas").getContext("2d");
            var rotation=360/n;
            ctx.translate(x, y);
            for(i=0;i<n;i++){
                ctx.rotate(rotation*Math.PI/180);
                drawTriangle(0,0,w,h,color);
            }
            ctx.translate(-x, -y);
        }

        function drawTriangle(x,y,w,h,color){ //x,y on center of bottom side of triangle placed like this /_\
            var ctx=document.getElementById("canvas").getContext("2d");
            ctx.fillStyle=color;
            ctx.beginPath();
            ctx.moveTo(x-w/2, y);
            ctx.lineTo(x+w/2, y);
            ctx.lineTo(x, y-h);
            ctx.closePath();
            ctx.fill();
        }

        function rand(a, b) {
            return a + Math.floor(Math.random() * (b - a + 1));
        }

        function hashCode(s){
            var hash=0;
            for(i=0;i<s.length;i++){
                code=s.charCodeAt(i);
                hash=((hash<<5)-hash)+code; //*31+character
                hash=hash & hash; //to 32bit
            }
            return hash;
        }