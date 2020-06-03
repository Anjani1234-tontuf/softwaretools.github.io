var TIMSHAYA   = TIMSHAYA || {}; //create your own namespace

(function(whichCanvas){

   TIMSHAYA.Triganimation = new function()
    {
        var numsqr = 40;
        var mShapes = [];
        var canvas = document.getElementById(whichCanvas);
        var context = canvas.getContext("2d");

        function drawRect(myRect)
        {
            context.beginPath();
            context.rect(myRect.x, myRect.y, myRect.width, myRect.height);

            context.fillStyle = "#8ED6FF";
            context.fill();
            context.lineWidth = myRect.borderWidth;
            context.strokeStyle = "black";
            context.stroke();
        }

        function animate(lastTime, mShapes, animProp)
        {
            if (animProp.animate)
            {
                var date = new Date();
                var time = date.getTime();
                var timeDiff = time - lastTime;

                for(var j = 0; j < numsqr; j++)
                {
                    mShapes[j].x = mShapes[j].centerX + Math.cos( mShapes[j].angle * Math.PI/180 ) * mShapes[j].radius;
                    mShapes[j].y = mShapes[j].centerY + Math.sin( mShapes[j].angle * Math.PI/180 ) * mShapes[j].radius;

                    (mShapes[j].angle < 360) ? mShapes[j].angle += 1 : mShapes[j].angle = 0;
                }
                lastTime = time;

                // clear canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                // draw
                for(var l = 0; l < numsqr; l++)
                   drawRect(mShapes[l]);

                // request new frame
                requestAnimFrame(function(){
                    animate(lastTime,  mShapes, animProp);
                })
            }
        }

        this.init = function()
        {
            //alert("this = " + this.name );
             for(var i = 0; i < numsqr; i++)
             {
                 mShapes[i] = {
                    angle:0,
                    width:20,
                    height:20,
                    x: 100 + i*10,
                    y: 250,
                    centerX: 290,
                    centerY: 290,
                    radius: 250 - (1 + i * 5),
                    borderWidth: 1
                }
             }

            var animProp = {
                animate: false
            }

            document.getElementById(whichCanvas).addEventListener("click", function(){
                if (animProp.animate) {
                    animProp.animate = false;
                }
                else {
                    animProp.animate = true;
                    var date = new Date();
                    var time = date.getTime();
                    animate(time,  mShapes, animProp);
                }
            });

            for(var k = 0; k < numsqr; k++)
               drawRect( mShapes[k] );
        }
    }

    TIMSHAYA.Triganimation.init();

})("myCanvas");
