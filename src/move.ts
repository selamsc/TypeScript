type List = Array<Folder>;
interface Folder {
  id: string;
  name: string;
  files: Array<File>;
}
interface File {
  id: string;
  name: string;
}
export default function move(list: List, source: string, destination: string): List {
  // source should be equal to file.id
  // destination should be equal to folder.id
  if (list.find((folder: Folder) => folder.id === source)) {
    throw new Error('You cannot move a folder');
  }
  if (list.find((folder: Folder) => folder.files.find((file: File) => file.id === destination))) {
    throw new Error('You cannot specify a file as the destination');
  }
  const sourceFolder = list.find((folder: Folder) => {
    return folder.files.find((file: File) => file.id === source);
  });
  if (sourceFolder) {
    const sourceFile = sourceFolder.files.find((file: File) => file.id === source);
    if (sourceFile) {
      // filed moved to destination and remove from source
      sourceFolder.files = sourceFolder.files.filter((file: File) => file.id !== source);
      const destinationFolder = list.find((folder: Folder) => folder.id === destination);
      if (destinationFolder) {
        destinationFolder.files.push(sourceFile);
      } else {
        throw new Error('Destination folder not found');
      }
    }
  } else {
    throw new Error('Source file not found');
  }
  return list;
}
