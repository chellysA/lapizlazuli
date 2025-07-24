import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
};
const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid } = props;

  return (
    <div className="flex justify-center gap-8 mx-20 md:mx-auto">
      {Array.from({ length: grid }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 w-full sm:w-1/2 md:w-1/3"
        >
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default SkeletonSchema;
