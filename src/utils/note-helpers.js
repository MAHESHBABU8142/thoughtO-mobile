import * as Clipboard from "expo-clipboard";
import * as Crypto from "expo-crypto";
import { Share } from "react-native";
import { getItem, setItem } from "./async-storage-helpers";

/*save note in storage*/

async function saveNote({ title, content }) {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();
  if (trimmedTitle === "" && trimmedContent === "") {
    return null;
  }
  let note = {
    id: Crypto.randomUUID(),
    title: trimmedTitle,
    content: trimmedContent,
    createdAt: Date.now(),
  };
  try {
    let notes = (await getItem("notes")) || [];
    notes.push(note);
    await setItem("notes", notes);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/*Remove Note from storage*/

async function removeNote(id, setData) {
  try {
    let notes = await getItem("notes");
    let newNotes = notes.filter((note) => note.id !== id);
    await setItem("notes", newNotes);
    setData(newNotes);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
async function copyNote(id) {
  let note = await getItem("notes").then((notes) =>
    notes.find((note) => note.id === id)
  );
  let text = `${note.title}\n\n${note.content}`;
  await Clipboard.setStringAsync(text);
}

async function shareNote(id) {
  let note = await getItem("notes").then((notes) =>
    notes.find((note) => note.id === id)
  );
  Share.share({
    message: `${note.title}\n\n${note.content}`,
  });
}

async function updateNote({ title, content, id }) {
  let trimmedContent = content.trim();
  let trimmedTitle = title.trim();
  if (trimmedContent === "" && trimmedTitle === "") {
    let notes = await getItem("notes");
    let newNotes = notes.filter((note) => note.id !== id);
    await setItem("notes", newNotes);
    return;
  }
  let notes = await getItem("notes");
  let newNotes = notes.map((note) => {
    if (note.id === id) {
      note.title = trimmedTitle;
      note.content = trimmedContent;
    }
    return note;
  });
  await setItem("notes", newNotes);
}

export { copyNote, removeNote, saveNote, shareNote, updateNote };
