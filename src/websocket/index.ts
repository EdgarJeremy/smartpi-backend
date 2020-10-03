import socketio from 'socket.io';
import rootHandler from './handlers/root';

const websocket: (io: socketio.Server) => void = (io: socketio.Server): void => {
	io.on('connect', (socket) => {
		console.log('socket connected', socket.id);
		socket.on('frame', (frame) => {
			io.emit('stream', frame);
		});
		socket.on('hello', (data) => {
			io.emit('hello', data);
		});
		socket.on('goodbye', (data) => {
			io.emit('goodbye', data);
		});
	});
};

export default websocket;
