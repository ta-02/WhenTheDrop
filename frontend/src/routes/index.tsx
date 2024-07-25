import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Problem } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { FaRegCheckCircle } from "react-icons/fa";
import axios from "axios";

export const Route = createFileRoute("/")({
  component: Index,
});

const getProblems = async () => {
  return axios
    .get("/api/problems")
    .then((res) => res.data)
    .catch((error) => {
      throw new Error("Failed to problems" + error.message);
    });
};

function Index() {
  const { isLoading, error, data } = useQuery<Problem[]>({
    queryKey: ["get-problems"],
    queryFn: getProblems,
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex items-start flex-col p-4 min-h-screen">
      <h1 className="flex justify-center text-2xl p-4">LeetCode📦</h1>
      <Table className="min-w-full lg:min-w-max">
        <TableCaption>Problems</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Difficulty</TableHead>
            <TableHead className="">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.map((problem) => {
            const difficultyColor =
              problem.difficulty === "Easy"
                ? "text-green-500"
                : problem.difficulty === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500";
            return (
              <TableRow key={problem.id}>
                <TableCell>
                  <FaRegCheckCircle className="text-green-800 text-lg" />
                </TableCell>
                <Link to={`/problems/${problem.id}`}>
                  <TableCell className="">{problem.title}</TableCell>
                </Link>
                <TableCell className={difficultyColor}>
                  {problem.difficulty}
                </TableCell>
                <TableCell className="">{problem.category}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Index;
