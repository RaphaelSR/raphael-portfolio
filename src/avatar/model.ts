import * as THREE from "three";
export function createCharacter() {
  const character = new THREE.Group();
  const head = new THREE.Group();
  head.position.y = 0.38;
  character.add(head);
  const material = (color: string, roughness = 0.85) =>
    new THREE.MeshStandardMaterial({ color, roughness });
  const skin = material("#dca785");
  const skinLight = material("#e6b593");
  const hair = material("#262125");
  const hairLight = material("#2b2427");
  const beard = material("#46302b");
  const cream = material("#fff7e8");
  const shirt = material("#34455d");
  const hatMaterial = material("#798870");
  const sphere = new THREE.SphereGeometry(1, 32, 24);
  function ellipsoid(
    parent: THREE.Object3D,
    mat: THREE.Material,
    position: [number, number, number],
    scale: [number, number, number],
  ) {
    const mesh = new THREE.Mesh(sphere, mat);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    parent.add(mesh);
    return mesh;
  }
  function curve(
    parent: THREE.Object3D,
    mat: THREE.Material,
    points: [number, number, number][],
    radius: number,
  ) {
    const path = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
    );
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(path, 20, radius, 8, false),
      mat,
    );
    parent.add(mesh);
    return mesh;
  }
  ellipsoid(character, shirt, [0, -0.91, -0.07], [0.95, 0.75, 0.48]);
  ellipsoid(character, skin, [0, -0.37, 0], [0.25, 0.4, 0.26]);
  curve(
    character,
    material("#607087"),
    [
      [-0.28, -0.51, 0.36],
      [0, -0.63, 0.42],
      [0.28, -0.51, 0.36],
    ],
    0.028,
  );
  ellipsoid(head, skin, [0, 0, 0], [0.68, 0.83, 0.6]);
  for (const side of [-1, 1]) {
    ellipsoid(head, skin, [side * 0.67, -0.04, -0.015], [0.13, 0.21, 0.115]);
    ellipsoid(
      head,
      material("#bd866e"),
      [side * 0.715, -0.035, 0.07],
      [0.055, 0.12, 0.035],
    );
  }
  ellipsoid(head, skinLight, [0, -0.03, 0.56], [0.105, 0.23, 0.14]);
  ellipsoid(head, skinLight, [0, -0.15, 0.64], [0.115, 0.095, 0.11]);
  for (const side of [-1, 1])
    ellipsoid(
      head,
      material("#9c6858"),
      [side * 0.072, -0.2, 0.66],
      [0.033, 0.018, 0.035],
    );
  const eyes: THREE.Group[] = [];
  const pupils: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    eye.position.set(side * 0.27, 0.14, 0.52);
    head.add(eye);
    eyes.push(eye);
    ellipsoid(eye, cream, [0, 0, 0], [0.19, 0.12, 0.09]);
    const pupil = new THREE.Group();
    pupil.position.z = 0.081;
    eye.add(pupil);
    pupils.push(pupil);
    ellipsoid(
      pupil,
      material("#594038", 0.45),
      [0, 0, 0],
      [0.079, 0.086, 0.028],
    );
    ellipsoid(
      pupil,
      material("#151820", 0.3),
      [0, 0, 0.025],
      [0.046, 0.058, 0.016],
    );
    ellipsoid(pupil, cream, [-0.02, 0.025, 0.041], [0.015, 0.017, 0.008]);
    curve(
      eye,
      material("#966857"),
      [
        [-0.18, 0.01, 0],
        [-0.13, 0.085, 0.025],
        [0, 0.116, 0.045],
        [0.13, 0.08, 0.025],
        [0.18, 0, 0],
      ],
      0.014,
    );
    curve(
      head,
      hair,
      [
        [side * 0.105, 0.32, 0.55],
        [side * 0.23, 0.375, 0.53],
        [side * 0.35, 0.375, 0.47],
        [side * 0.45, 0.32, 0.4],
      ],
      0.047,
    );
  }
  const beardGeometry = new THREE.SphereGeometry(
    1,
    48,
    32,
    0,
    Math.PI * 2,
    Math.PI * 0.71,
    Math.PI * 0.29,
  );
  const chin = new THREE.Mesh(beardGeometry, beard);
  chin.scale.set(0.684, 0.834, 0.606);
  head.add(chin);
  for (const side of [-1, 1]) {
    const moustache = ellipsoid(
      head,
      beard,
      [side * 0.12, -0.28, 0.555],
      [0.16, 0.055, 0.038],
    );
    moustache.rotation.z = side * -0.2;
  }
  ellipsoid(head, beard, [0, -0.47, 0.49], [0.065, 0.085, 0.026]);
  curve(
    head,
    material("#935e54"),
    [
      [-0.19, -0.355, 0.56],
      [-0.09, -0.385, 0.589],
      [0.09, -0.385, 0.589],
      [0.19, -0.355, 0.56],
    ],
    0.017,
  );
  // Broad swept locks give the hair a sculpted silhouette with no texture downloads.
  ellipsoid(head, hair, [0, 0.47, -0.14], [0.71, 0.52, 0.55]);
  const locks: [number, number, number, number, number, number, number][] = [
    [-0.46, 0.65, 0.19, 0.24, 0.4, 0.28, -0.42],
    [-0.23, 0.83, 0.23, 0.25, 0.35, 0.31, -0.64],
    [0.02, 0.88, 0.19, 0.27, 0.32, 0.35, -0.72],
    [0.28, 0.79, 0.12, 0.29, 0.31, 0.35, -0.62],
    [0.49, 0.59, 0.01, 0.21, 0.34, 0.35, -0.36],
    [-0.55, 0.33, -0.04, 0.15, 0.37, 0.35, -0.12],
    [0.57, 0.32, -0.05, 0.14, 0.32, 0.34, 0.06],
    [-0.32, 0.64, 0.43, 0.17, 0.25, 0.18, -0.82],
  ];
  locks.forEach((p, i) => {
    const lock = ellipsoid(
      head,
      i % 3 === 0 ? hairLight : hair,
      [p[0], p[1], p[2]],
      [p[3], p[4], p[5]],
    );
    lock.rotation.z = p[6];
  });
  const hat = new THREE.Group();
  hat.position.set(0, 1.04, -0.05);
  head.add(hat);
  ellipsoid(hat, hatMaterial, [0, 0.1, 0], [0.73, 0.29, 0.62]);
  ellipsoid(hat, hatMaterial, [0, -0.03, 0.18], [0.8, 0.07, 0.77]);
  curve(
    hat,
    material("#bdc5aa"),
    [
      [-0.53, 0.01, 0.43],
      [0, 0.015, 0.6],
      [0.53, 0.01, 0.43],
    ],
    0.035,
  );
  const hands: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const hand = new THREE.Group();
    hand.position.set(side * 0.78, -0.76, 0.48);
    character.add(hand);
    hands.push(hand);
    ellipsoid(hand, skin, [0, 0, 0], [0.17, 0.15, 0.1]);
    for (let finger = 0; finger < 4; finger++)
      ellipsoid(
        hand,
        skinLight,
        [(finger - 1.5) * 0.075, 0.08, 0.055],
        [0.045, 0.11 - Math.abs(finger - 1.5) * 0.015, 0.05],
      );
    ellipsoid(hand, skin, [side * -0.13, -0.03, 0.065], [0.065, 0.1, 0.06]);
  }
  return { character, head, eyes, pupils, hat, hands };
}
