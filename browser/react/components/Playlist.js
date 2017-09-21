import React, {Component} from 'react'
import Songs from './Songs'
import axios from 'axios'

export default class Playlist extends Component{

	constructor(){
		super()
		this.state={
			playlist : {}
		}
	}

	componentDidMount(){
		console.log('helloooooo')
		const playlistId = this.props.match.params.playlistId
		console.log(playlistId)
		console.log('playlistId')
		axios.get(`/api/playlists/${playlistId}`)
			.then(res => res.data)
			.then(playlist => {
				this.setState({playlist})
			})
	}

	render(){
		const {playlist} = this.state
		return(
			<div>
			  <h3>{ playlist.name }</h3>
			  <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
			  { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
			  <hr />
			</div>
			)
	}

}