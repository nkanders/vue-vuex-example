// import axios from 'axios'

export default {
  getHubs(locationId) {
    return new Promise(function(resolve, reject) {
      resolve([
        {
          id: 1,
          type: 'acdc',
          label: 'Smart ACDC Hub 1',
          nodes: { '1': { id: 1, title: 'Vegetable Garden1', description: 'Next watering: in 2 days' }, '2': { id: 2, title: 'Vegetable Garden2', description: 'Next watering: in 2 days' } }
        },
        {
          id: 2,
          type: 'acdc',
          label: 'Smart ACDC Hub 2',
          nodes: { '3': { id: 3, title: 'Vegetable Garden3', description: 'Next watering: in 2 days' }, '4': { id: 4, title: 'Vegetable Garden4', description: 'Next watering: in 2 days' } }
        },
        {
          id: 3,
          type: 'acdc',
          label: 'Smart ACDC Hub 3',
          nodes: { '5': { id: 5, title: 'Vegetable Garden5', description: 'Next watering: in 2 days' }, '6': { id: 6, title: 'Vegetable Garden6', description: 'Next watering: in 2 days' } }
        },
        {
          id: 4,
          type: 'dc',
          label: 'Smart DC Hub 4',
          nodes: { '7': { id: 7, title: 'Vegetable Garden7', description: 'Next watering: in 2 days' }, '8': { id: 8, title: 'Vegetable Garden8', description: 'Next watering: in 2 days' } }
        },
        {
          id: 5,
          type: 'dc',
          label: 'Smart DC Hub 5',
          nodes: { '9': { id: 9, title: 'Vegetable Garden9', description: 'Next watering: in 2 days' }, '10': { id: 10, title: 'Vegetable Garden10', description: 'Next watering: in 2 days' } }
        }
      ])
    })
  }
}
