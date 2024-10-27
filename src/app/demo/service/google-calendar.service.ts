import { Injectable } from '@angular/core';
import { loadGapiInsideDOM } from 'gapi-script';

interface CalendarEvent {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string; // ISO format
    timeZone?: string;
  };
  end: {
    dateTime: string; // ISO format
    timeZone?: string;
  };
  [key: string]: any; // For additional properties
}

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private gapi: any;
  private CLIENT_ID = '857001621181-4faktb87migje78r1n128eohh4j7q5l0.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyC520_lPWxYWYrn6kuvBmYPu-Au5mT7lFg';
  private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  private SCOPES = "https://www.googleapis.com/auth/calendar.events";

  constructor() {
    this.initClient(); // Call here to initialize when the service is created
  }

  private async initClient() {
    await loadGapiInsideDOM();
    this.gapi = window['gapi'];

    // Ensure the client is loaded properly
    return new Promise((resolve, reject) => {
      this.gapi.load('client:auth2', async () => {
        try {
          await this.gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES,
          });
          resolve(true);
        } catch (error) {
          console.error('Error initializing GAPI client:', error);
          reject(error);
        }
      });
    });
  }

  async signIn() {
    await this.initClient(); // Ensure client is initialized
    try {
      await this.gapi.auth2.getAuthInstance().signIn();
      console.log('Sign-in successful');
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error('Sign-in failed');
    }
  }

  async signOut() {
    try {
      await this.gapi.auth2.getAuthInstance().signOut();
      console.log('Sign-out successful');
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Sign-out failed');
    }
  }

  async addEvent(event: CalendarEvent) {
    await this.initClient(); // Ensure client is initialized before proceeding
    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await this.signIn();
      }
      const response = await this.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      console.log('Event created:', response);
      return response;
    } catch (error) {
      console.error('Error adding event:', error);
      throw new Error('Failed to add event to Google Calendar');
    }
  }
}
