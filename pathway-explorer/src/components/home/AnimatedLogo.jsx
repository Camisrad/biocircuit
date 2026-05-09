export default function AnimatedLogo({ size = 40 }) {
  return (
    <img
      src="https://media.base44.com/images/public/68ef0bc537b6f2d8ca088259/dda8b9d15_ChatGPTImageApr18202612_40_57PM.png"
      alt="BioCircuit"
      style={{
        display: "block",
        width: size * 4,
        height: size,
        objectFit: "cover",
        objectPosition: "center center",
      }}
    />
  );
}