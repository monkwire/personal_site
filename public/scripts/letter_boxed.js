console.log("js loaded")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.height = 500;
canvas.width  = 500;



function draw_node(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

}



function draw_puzzle(ctx, puzzle) {

    BOX_SIZE = 300;

    ctx.fillStyle = 'rgb(252, 113, 107)';
    ctx.fillRect(0, 0, BOX_SIZE, BOX_SIZE);


    ctx.fillStyle = 'black';
    ctx.fillRect(BOX_SIZE * .1, BOX_SIZE * .1, BOX_SIZE * .8, BOX_SIZE * .8);

    ctx.fillStyle = 'white';

    ctx.fillRect((BOX_SIZE * .1) + 5, (BOX_SIZE * .1) + 5, (BOX_SIZE * .8) - 10, (BOX_SIZE * .8) - 10);


    draw_node(ctx, BOX_SIZE * .1, BOX_SIZE / 2);
    draw_node(ctx, BOX_SIZE / 2, BOX_SIZE * .1);
    draw_node(ctx, BOX_SIZE * .9, BOX_SIZE / 2);
    draw_node(ctx, BOX_SIZE / 2, BOX_SIZE * .9);

    draw_node(ctx, BOX_SIZE * .1, BOX_SIZE * .25)
    draw_node(ctx, BOX_SIZE * .1, BOX_SIZE * .75)

    draw_node(ctx, BOX_SIZE * .9, BOX_SIZE * .25);
    draw_node(ctx, BOX_SIZE * .9, BOX_SIZE * .75);

    draw_node(ctx, BOX_SIZE * .25, BOX_SIZE * .1);
    draw_node(ctx, BOX_SIZE * .75, BOX_SIZE * .1);

    draw_node(ctx, BOX_SIZE * .25, BOX_SIZE * .9);
    draw_node(ctx, BOX_SIZE * .75, BOX_SIZE * .9);



    ctx.font = '30px sans-serif';

    ctx.fillText('A',  (BOX_SIZE * .25) - 15, BOX_SIZE * .065);
    ctx.fillText('A',  (BOX_SIZE * .5) - 15, BOX_SIZE * .065);
    ctx.fillText('A',  (BOX_SIZE * .75) - 15, BOX_SIZE * .065);

    ctx.fillText('A', BOX_SIZE * .94, (BOX_SIZE * .25) + 10);
    ctx.fillText('A', BOX_SIZE * .94, (BOX_SIZE * .75) + 10);
    ctx.fillText('A', BOX_SIZE * .94, (BOX_SIZE / 2) + 10);

    ctx.fillText('A',  (BOX_SIZE * .25) - 15, (BOX_SIZE * .94) + 25);
    ctx.fillText('A',  (BOX_SIZE * .5) - 15, (BOX_SIZE * .94) + 25);
    ctx.fillText('A',  (BOX_SIZE * .75) - 15, (BOX_SIZE * .94) + 25);





    ctx.fillText('A', BOX_SIZE * .001, (BOX_SIZE * .25) + 10);
    ctx.fillText('A', BOX_SIZE * .001, (BOX_SIZE * .75) + 10);
    ctx.fillText('A', BOX_SIZE * .001, (BOX_SIZE / 2) + 10);





};


draw_puzzle(ctx, 'abcdefghijkl');
