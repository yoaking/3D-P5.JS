function setup() {
  // Membuat canvas 3D
  createCanvas(400, 400, WEBGL);
}

function draw() {
  // Mengatur background
  background(200);

  // Menambahkan pencahayaan
  directionalLight(255, 255, 255, 0.5, 1, -0.5);
  ambientLight(100);

  // Mengatur rotasi objek berdasarkan waktu
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Membuat bentuk bintang 3D
  push();
  fill(255, 215, 0); // Warna emas
  stroke(0); // Garis tepi warna hitam
  strokeWeight(1);
  createClosed3DStar(5, 50, 100, 30); // Membuat bintang 3D tertutup
  pop();
}

// Fungsi untuk membuat bentuk bintang 3D tertutup
function createClosed3DStar(npoints, radius1, radius2, depth) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  // Menyimpan titik-titik atas dan bawah bintang
  let topVertices = [];
  let bottomVertices = [];

  // Menghitung titik-titik
  for (let a = 0; a < TWO_PI; a += angle) {
    let x1 = cos(a) * radius2;
    let y1 = sin(a) * radius2;
    let x2 = cos(a + halfAngle) * radius1;
    let y2 = sin(a + halfAngle) * radius1;

    // Menyimpan titik atas
    topVertices.push([x1, y1, -depth / 2]);
    topVertices.push([x2, y2, -depth / 2]);

    // Menyimpan titik bawah
    bottomVertices.push([x1, y1, depth / 2]);
    bottomVertices.push([x2, y2, depth / 2]);
  }

  // Menggambar sisi atas
  beginShape();
  for (let v of topVertices) {
    vertex(v[0], v[1], v[2]);
  }
  endShape(CLOSE);

  // Menggambar sisi bawah
  beginShape();
  for (let v of bottomVertices) {
    vertex(v[0], v[1], v[2]);
  }
  endShape(CLOSE);

  // Menghubungkan sisi-sisi antara atas dan bawah
  for (let i = 0; i < topVertices.length; i++) {
    let next = (i + 1) % topVertices.length;
    beginShape();
    vertex(topVertices[i][0], topVertices[i][1], topVertices[i][2]);
    vertex(bottomVertices[i][0], bottomVertices[i][1], bottomVertices[i][2]);
    vertex(bottomVertices[next][0], bottomVertices[next][1], bottomVertices[next][2]);
    vertex(topVertices[next][0], topVertices[next][1], topVertices[next][2]);
    endShape(CLOSE);
  }
}
