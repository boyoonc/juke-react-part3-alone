import React, {Component} from 'react'
import Songs from './Songs'
import AddSongForm from './AddSongForm'
import axios from 'axios'

export default class Playlist extends Component{

	constructor(){
		super()
		this.state={
			playlist : {}
		}
		this.addSongToPlayist = this.addSongToPlayist.bind(this)
	}

	addSongToPlayist (playlistId, songId){
		return axios.post(`/api/playlists/${playlistId}/songs`, {
			id: songId //this is what this route expects
		})
		.then(res => res.data)
		.then(song => {
			const playlist = this.state.playlist
			const songs = playlist.songs
			const newSongs = [...songs, song]
			const newPlaylist = Object.assign({}, playlist, {songs: newSongs})
			this.setState({ playlist : newPlaylist })
		})
	}

	fetchPlaylistById(playlistId){
		axios.get(`/api/playlists/${playlistId}`)
			.then(res => res.data)
			.then(playlist => {
				this.setState({playlist})
			})
	}

	componentDidMount(){

		const playlistId = this.props.match.params.playlistId
		this.fetchPlaylistById(playlistId)
		
	}

	componentWillReceiveProps(nextProps){
		console.log('componentWillReceiveProps')
		const currentProps = this.props;
		const nextPlaylistId = nextProps.match.params.playlistId
		const currentPlaylistId = currentProps.match.params.playlistId
		if(nextPlaylistId !== currentPlaylistId){
			this.fetchPlaylistById(nextPlaylistId);
		}
	}

	render(){
		const {playlist} = this.state
		return(
			<div>
			  <h3>{ playlist.name }</h3>
			  <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
			  { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
			  <hr />
			  <AddSongForm addSongToPlaylist={this.addSongToPlayist} playlist={playlist} />
			</div>
			)
	}

}