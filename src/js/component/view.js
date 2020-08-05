import React from "react";

export class View extends React.Component {
	constructor() {
		super();
		this.audio = null;

		this.state = {
			currentIndex: 0,
			songs: [
				{
					title: "South Park",
					id: "south-park",
					author: "Kyle",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
				},
				{
					title: "Thunder Cats",
					id: "thundercats",
					author: "Moonra",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Profesor",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			]
		};
	}

	componentDidMount() {
		this.pauseButton.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(songs => this.setState({ songs }));
	}

	changeTrack(i) {
		this.setState({ currentIndex: i });
		this.audio.current.pause();
		this.audio.current.load();
		this.audio.current.play();
	}

	play = i => {
		var url = this.state.songs[i].url;
		const songURL = "https://assets.breatheco.de/apis/sound/" + url;
		this.audio.src = songURL;
		this.audio.play();
		this.playButton.style.display = "none";
		this.pauseButton.style.display = "inline-block";
		this.setState({ currentIndex: i });
	};

	pause = () => {
		this.audio.pause();
		this.playButton.style.display = "inline-block";
		this.pauseButton.style.display = "none";
	};

	render() {
		const liList = this.state.songs.map((song, index) => {
			return (
				<li key={index} onClick={() => this.play(index)}>
					<span className="number">{index + 1}</span>
					<span className="title">{song.name}</span>
				</li>
			);
		});

		const audioPlayer = (
			<>
				<div className="buttons">
					<button
						onClick={() => this.play(this.state.currentIndex - 1)}>
						<i className="fa fa-caret-left" aria-hidden="true" />
					</button>
					<button
						ref={element => (this.playButton = element)}
						onClick={() => this.play(this.state.currentIndex)}>
						<i className="fa fa-play" aria-hidden="true" />
					</button>
					<button
						ref={element => (this.pauseButton = element)}
						onClick={() => this.pause(this.state.currentIndex)}>
						<i className="fa fa-pause" aria-hidden="true" />
					</button>
					<button
						onClick={() => this.play(this.state.currentIndex + 1)}>
						<i className="fa fa-caret-right" aria-hidden="true" />
					</button>
				</div>
				<div className="tracker">
					<audio controls ref={element => (this.audio = element)} />
				</div>
			</>
		);

		return (
			<>
				{audioPlayer}
				<ul>{liList}</ul>
			</>
		);
	}
}
