class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        
        // Setup
        let vertex_list = [{x: 100, y: 100}, {x: 150, y: 300}, {x: 300, y: 250}, {x: 250, y: 100}];     // Line 1 Points
        let vertex_list2 = [{x: 100, y: 550}, {x: 650, y: 450}, {x: 200, y: 400}, {x: 700, y: 100}];    // Line 2 Points
        let color = [255, 0, 0, 255];   // Line Color
        let vColor = [0, 0, 0, 255]     // Vertex Color

        // Draw Lines
        this.drawBezierCurve(vertex_list[0], vertex_list[1], vertex_list[2], vertex_list[3], this.num_curve_sections, color, framebuffer);
        this.drawBezierCurve(vertex_list2[0], vertex_list2[1], vertex_list2[2], vertex_list2[3], this.num_curve_sections, color, framebuffer);

        // Draw Vertices
        if (this.show_points) {
            for (let i = 0; i < vertex_list.length; i++) {
                this.drawVertex(vertex_list[i], vColor, framebuffer);
                this.drawVertex(vertex_list2[i], vColor, framebuffer);
                
                // Colors Vertices and Control Points differently
                if ((i + 1) == 3) {
                    vColor = [0, 0, 0, 255];
                }
                else {
                    vColor = [0, 127, 127, 255];
                }
            }
        }

    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {

        // Setup
        let center = {x: 400, y: 350};  // Center of Circle 1
        let radius = 200;               // Radius of Circle 1
        let center2 = {x: 100, y: 150}; // Center of Circle 2
        let radius2 = 50;               // Radius of Circle 2
        
        // Draw Circles
        this.drawCircle(center, radius, this.num_curve_sections, [255, 125, 0, 255], framebuffer);  // Circle 1
        this.drawCircle(center2, radius2, this.num_curve_sections, [125, 125, 0, 255], framebuffer);  // Circle 2

        // Draw Vertices
        if (this.show_points) {

            for (let i = 0; i < 360; i += (360 / this.num_curve_sections)) {
                
                // Circle 1
                let x = center.x + radius * Math.cos(i * (Math.PI / 180));
                x = parseInt(x);
                let y = center.y + radius * Math.sin(i * (Math.PI / 180));
                y = parseInt(y);
                this.drawVertex({x: x, y: y}, [0, 0, 0, 255], framebuffer);

                // Circle 2
                x = center2.x + radius2 * Math.cos(i * (Math.PI / 180));
                x = parseInt(x);
                y = center2.y + radius2 * Math.sin(i * (Math.PI / 180));
                y = parseInt(y);
                this.drawVertex({x: x, y: y}, [0, 0, 0, 255], framebuffer);

            }

        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {

        // Setup
        let vertex_list = [{x: 100, y: 100}, {x: 150, y: 100}, 
                            {x: 200, y: 150}, {x: 200, y: 200}, 
                            {x: 150, y: 250}, {x: 100, y: 250},
                            {x: 50, y: 200}, {x: 50, y: 150}];
       let vertex_list2 = [{x: 400, y: 200}, {x: 500, y: 200}, 
                            {x: 500, y: 300}, {x: 450, y: 350},
                            {x: 350, y: 400}, {x: 325, y: 350}];

        // Draw Polygons
        this.drawConvexPolygon(vertex_list, [0, 128, 128, 255], framebuffer);
        this.drawConvexPolygon(vertex_list2, [0, 128, 128, 255], framebuffer);
            
        // Draw Vertices
        if (this.show_points) {
            for (let i = 0; i < vertex_list.length; i++) {
                this.drawVertex(vertex_list[i], [0, 0, 0, 255], framebuffer);
            }
            for (let i = 0; i < vertex_list2.length; i++) {
                this.drawVertex(vertex_list2[i], [0, 0, 0, 255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {

        // Setup
        let color = [0, 125, 125, 255];
        let vertex_list = [{x: 100, y: 100}, {x: 100, y: 300}, 
                             {x: 100, y: 300}, {x: 150, y: 100},
                             {x: 150, y: 100}, {x: 150, y: 300},
                             {x: 250, y: 200},  
                             {x: 450, y: 200},  
                             {x: 525, y: 200}, {x: 525, y: 125}, {x: 525, y: 125}, {x: 550, y: 125},
                             {x: 600, y: 200}, {x: 675, y: 250}, {x: 700, y: 250}, {x: 675, y: 100}];

        //
        // N
        //
        this.drawLine(vertex_list[0], vertex_list[1], color, framebuffer);
        this.drawLine(vertex_list[2], vertex_list[3], color, framebuffer);
        this.drawLine(vertex_list[4], vertex_list[5], color, framebuffer);
        
        //
        // O
        //
        this.drawCircle(vertex_list[6], 75, this.num_curve_sections, color, framebuffer);

        //
        // A
        //
        this.drawCircle(vertex_list[7], 75, this.num_curve_sections, color, framebuffer);
        this.drawBezierCurve(vertex_list[8], vertex_list[9], vertex_list[10], vertex_list[11], this.num_curve_sections, color, framebuffer);

        //
        // H
        //
        let polyList = [{x: 600, y: 300}, {x: 605, y: 300}, {x: 610, y: 305}, {x: 610, y: 310},
                            {x: 605, y: 315}, {x: 600, y: 315}, {x: 595, y: 310}, {x: 595, y: 305}];
        for (let i = 0; i <= 10; i++) {
            this.drawConvexPolygon(polyList, color, framebuffer);
            if (this.show_points) { // Draw Vertices for Polygons
                for (let j = 0; j < polyList.length; j++) {
                    this.drawVertex(polyList[j], [0, 0, 0, 255], framebuffer);
                }
            }
            for (let j = 0; j < polyList.length; j++) {
                polyList[j].y -= 20;
            }
        }
        this.drawBezierCurve(vertex_list[12], vertex_list[13], vertex_list[14], vertex_list[15], this.num_curve_sections, color, framebuffer);

        // Draw Vertices
        if (this.show_points) {
            for (let i = 0; i < vertex_list.length; i++) {
                if (i == 9 || i == 10 || i == 13 || i == 14) {  // control points colored differently
                    this.drawVertex(vertex_list[i], [125, 0, 0, 255], framebuffer);
                }
                else {
                    this.drawVertex(vertex_list[i], [0, 0, 0, 255], framebuffer);
                }
            }
        }
        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {

        let pre = p0;   // Starting point of line drawn

        for (let t = 0; t <= 1; t += (1 / num_edges)) {
            // Vertex Calculation
            let x = Math.pow((1-t), 3) * p0.x + 3 * Math.pow((1-t), 2) * t * p1.x + 3 * (1-t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
            x = parseInt(x);
            let y = Math.pow((1-t), 3) * p0.y + 3 * Math.pow((1-t), 2) * t * p1.y + 3 * (1-t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
            y = parseInt(y);

            this.drawLine(pre, {x: x, y: y}, color, framebuffer);

            pre = {x: x, y: y}; // Update Last point

            //console.log(t + " " + x + " " + y); // debug
        }       
        this.drawLine(pre, p3, color, framebuffer); // Ensures last line is drawn correctly
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {

        // First Point
        let x = center.x + radius * Math.cos(0);
        let y = center.y + radius * Math.sin(0);
        let pre = {x: x, y: y};                     // Previous Point

        for (let i = (360 / num_edges); i < 360; i += (360 / num_edges)) {
            x = center.x + radius * Math.cos(i * (Math.PI / 180));
            x = parseInt(x);
            y = center.y + radius * Math.sin(i * (Math.PI / 180));
            y = parseInt(y);
            this.drawLine(pre, {x: x, y: y}, color, framebuffer);
            pre = {x: x, y: y};
        }

        // Last Line
        this.drawLine({x: center.x + radius * Math.cos(0), y: center.y + radius * Math.sin(0)}, pre, color, framebuffer);

    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {     

        // Setup to fix the problem in triangle becuase when i tried to use your fix it didn't work and I'm just keeping this because I'm lazy
        let poly = [];
        for (let i = 1; i < vertex_list.length - 1; i++) {
            poly[i] = {p1: vertex_list[i], p2: vertex_list[i+1]};
        }
        
        let x0 = vertex_list[0].x;
        let y0 = vertex_list[0].y;
        let x1, y1, x2, y2;

        // Draws Triangles to form polygons
        for (let i = 1; i < poly.length; i++) {
            x1 = poly[i].p1.x;
            x2 = poly[i].p2.x;
            y1 = poly[i].p1.y;
            y2 = poly[i].p2.y;
            this.drawTriangle({x: x0, y: y0}, {x: x1, y: y1}, {x: x2, y: y2}, color, framebuffer);            
        }

    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        
        // Calculate vertices for Lines
        let vertex_list = [{x: v.x-5, y: v.y-5}, {x: v.x+5, y: v.y+5},
                             {x: v.x-5, y: v.y+5}, {x: v.x+5, y: v.y-5}];
        
        // Draw Lines to create an X on vertex
        this.drawLine(vertex_list[0], vertex_list[1], color, framebuffer);
        this.drawLine(vertex_list[2], vertex_list[3], color, framebuffer);

    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
