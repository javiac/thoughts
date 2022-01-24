import assert from 'assert';
import https from 'http';

import { Mood } from '../src/enums/Mood';
import { IThought } from '../src/interfaces/IThought';

let thoughtId: string;

describe('API tests', function () {
  describe('API tests', function () {
    it('should return 3 thoughts', function (done) {
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/thoughts',
        method: 'GET'
      };

      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          const thoughtsList: IThought[] = JSON.parse(d.toString()).data;
          assert.equal(thoughtsList.length, 3);
          assert.equal(thoughtsList[0].title, 'I need to think more what the other person is feeling');
          done();
        });
      });
      req.end();
    });

    it('should save a new thought', function (done) {
      const thought: IThought = {
        title: 'test 1 title',
        description: 'test 1 description',
        mood: Mood.cloud
      };

      const data = JSON.stringify(thought);

      const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/thoughts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          const newThought: IThought = JSON.parse(d.toString()).data;
          thoughtId = newThought.id ?? '';
          assert.notEqual(newThought.id, undefined);
          assert.equal(newThought.title, 'test 1 title');
          done();
        });
      });

      req.write(data);
      req.end();
    });

    it('should return 4 thoughts', function (done) {
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/thoughts',
        method: 'GET'
      };

      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          const thoughtsList: IThought[] = JSON.parse(d.toString()).data;
          assert.equal(thoughtsList.length, 4);
          assert.equal(thoughtsList[3].id, thoughtId);
          done();
        });
      });
      req.end();
    });
  });
});
