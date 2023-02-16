export default function BoardSpace ({position}) {

  return (
    <mesh position={position}>
      <boxGeometry args={[0.95,0.05,0.95]} />
      <meshLambertMaterial color="#690" />
    </mesh>
  );
}
