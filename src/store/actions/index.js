import blogActions from './blogActions'
import userActions from './userActions'
import mediaActions from './mediaActions'
import projectActions from './projectActions'

export default {
    ...userActions,
    ...blogActions,
    ...mediaActions,
    ...projectActions,
}