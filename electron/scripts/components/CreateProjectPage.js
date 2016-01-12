import React, {Component} from 'react';
import ideActions from '../actions/ideActions';
import userActions from '../actions/userActions';
import Markdown from 'react-remarkable';
import classNames from 'classNames';

// Move this to firebase later.
let templates = [{
    id: 'template-console',
    name: 'Console',
    thumbnail: 'https://star-trek-kg.googlecode.com/svn/wiki/StarTrekKGNebula.PNG',
    description: 'Choose this to build a console application that can be used for simple console applications.',
    exportsFor: ['browser', 'nodejs'],
    package: {
        'x-human-name': 'New Template Project',
        'description': 'Cool console project',
        'dependencies': {
        },
    }
}, {
    id: 'template-canvas',
    name: 'Canvas',
    comingSoon: true,
    thumbnail: 'http://media.creativebloq.futurecdn.net/sites/creativebloq.com/files/images/2013/05/Hannah/canvas-defense.jpg',
    description: 'Choose this to build beautiful canvas visualization quickly with powerful canvas module imported by default.',
    exportsFor: ['browser']
}, {
    id: 'template-iot',
    name: 'Internet of Things',
    comingSoon: true,
    description: 'Choose this to build cool stuff like robots, automations or control your house hold things.',
    exportsFor: ['nodejs'],
    thumbnail: 'http://static5.businessinsider.com/image/524b3f456bb3f74e5952dcf1/morgan-stanley-75-billion-devices-will-be-connected-to-the-internet-of-things-by-2020.jpg',
}, {
    id: 'template-api',
    name: 'Swagger SaaS',
    comingSoon: true,
    description: 'Use this to build a simple CRUD api service quickly with Swagger and deploy in minutes.',
    exportsFor: ['nodejs'],
    thumbnail: 'http://rallyengine.com/wp-content/uploads/2015/04/SaaS-cloud-hosting-enterprise-startups.jpg'
}];

console.log(ideActions);

let TemplateCard = (props) =>{
    let className = classNames('template-card', 'mdl-grid-4', {
        'template-card--coming-soon': props.comingSoon
    });
    return  <MDL.Card
                onClick={e => ideActions.createProject(props.package)}
                shadow={4}
                className={className}
                style={{backgroundImage: `url(${props.thumbnail})`}}
            >
                <MDL.CardTitle expand>{props.name + ' App'}</MDL.CardTitle>
                <MDL.CardText className="template-card__text">
                    <Markdown source={props.description} />
                </MDL.CardText>
            </MDL.Card>
};

class CreateProjectPage extends Component{

    constructor(...p){
        super(...p);
        this.state = {
            selectedIndex: -1,
            packageData: {
            }
        };
    }

    render(){
        return  <MDL.Layout>
                    <MDL.Header seamed={true} title="New Project"></MDL.Header>
                    <MDL.Content className="padded-content">
                        <h4>Choose a template</h4>
                        <MDL.Grid>
                            {templates.map( (t, i) => {
                                return <MDL.Cell col={3}>
                                         <TemplateCard
                                            isSelected={ i === this.state.selectedIndex }
                                            {...t}
                                         />
                                       </MDL.Cell>;
                            })}
                        </MDL.Grid>
                    </MDL.Content>
                </MDL.Layout>;
    }
};

export default CreateProjectPage;
