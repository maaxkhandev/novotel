type SizedBoxProps = {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
};

export const SizedBox = ({
  width = "auto",
  height = "auto",
  children,
}: SizedBoxProps) => {
  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        display: children ? "inline-block" : "block",
      }}
    >
      {children}
    </div>
  );
};

export default SizedBox;
