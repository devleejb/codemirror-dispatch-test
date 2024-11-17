# codemirror-dispatch-test

This project reproduces a bug in codemirror where the dispatch method does not work as expected.

We use [Yorkie](https://github.com/yorkie-team/yorkie) to synchronize the state of the codemirror editor across multiple clients. When yorkie receives a snapshot event, it overwrites the content of the editor and cursor position with the snapshot content using following code. (Follwing code is related to `frontend/src/main.ts` line 56-81.)

```typescript
view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: text.toString() },
    annotations: [Transaction.remote.of(true)],
    selection: {
        anchor: ...,
        head: ...,
    }
});
```

<video src="./video.mp4"></video>

However, there are following issues.

1. While dragging with the mouse, if a snapshot event occurs, the starting point of the drag moves to the topmost position.
2. If a snapshot event occurs during text input, there are intermittent instances where the scroll jumps to the top and then returns to the current position.

## How to run?

1. Run `yorkie` using `docker-compose`.
   ```bash
   docker-compose -f ./docker/docker-compose.yml up -d
   ```
2. Run `frontend` using `npm`.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Run crawler to generate snapshot events.
   ```bash
   # Open a new terminal
   cd ../crawler
   npm install
   npm run start
   ```
4. Open `http://localhost:5173` and start dragging in the editor.
