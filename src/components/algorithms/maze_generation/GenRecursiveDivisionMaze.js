import GenMazeAlternateWall from "./GenMazeAlternateWall";
import GenMazeBorder from "./GenMazeBorder";
import MazeGenWrapper from "./MazeGenWrapper";
import GenPrimsMaze from "./GenPrimsMaze";
import LinkedList from "../data_structures/linked_list/LinkedList"

function GenRecursiveDivisionMaze (data) {
    const tmp = async () => {
        const a = MazeGenWrapper(data, GenMazeBorder(data));
        await a();
        const b = MazeGenWrapper(data, GenMazeAlternateWall(data));
        await b()

        //await MazeGenWrapper(data, GenPrimsMaze(data))();
        console.log("done");
    };
    
    return tmp
}

export default GenRecursiveDivisionMaze