import GenMazeAlternateWall from "./GenMazeAlternateWall";
import GenMazeBorder from "./GenMazeBorder";
import MazeGenWrapper from "./MazeGenWrapper";
import GenPrimsMaze from "./GenPrimsMaze";
import LinkedList from "../data_structures/linked_list/LinkedList"

function GenRecursiveDivisionMaze (data) {
    const tmp = async () => {
        await MazeGenWrapper(data, await GenMazeBorder(data)).runAlgorithm();
        await MazeGenWrapper(data, await GenMazeAlternateWall(data)).runAlgorithm();
        await MazeGenWrapper(data, await GenPrimsMaze(data)).runAlgorithm();
    };
    
    return tmp
}

export default GenRecursiveDivisionMaze