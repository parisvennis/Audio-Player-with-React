import React from "react";

export class View extends React.Component {
	constructor() {
		super();
		this.audio = null;
		this.state = {
			currentIndex: 1,
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

	changeTrack(i) {
		this.setState({ currentIndex: i });
		this.audio.current.pause();
		this.audio.current.load();
		this.audio.current.play();
	}

	render() {
		const liList = this.state.songs.map((song, index) => {
			return (
				<li key={index} onClick={() => this.changeTrack(index)}>
					<span>{index + 1}</span>
					<span>{song.title}</span>
				</li>
			);
		});

		const audioPlayer = (
			<audio controls ref={element => (this.audio = element)}>
				<source
					src={this.state.songs[this.state.currentIndex].url}
					type="audio/mp3"
				/>
			</audio>
		);
		return (
			<>
				{audioPlayer}
				<ul>{liList}</ul>
			</>
		);
	}
}
