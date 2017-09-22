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
		console.log('am i here?')
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
			  <AddSongForm />
			</div>
			)
	}

}