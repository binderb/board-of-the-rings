export default function BoardSpace ({position}) {

  return (
    <mesh position={position}>
      <boxGeometry args={[4.95,0.05,1.25]} />
      <meshLambertMaterial color="#690" />
    </mesh>
  );
}
