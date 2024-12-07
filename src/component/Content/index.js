import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

import { useContext, useEffect, useState } from 'react';

import Header from '~/component/Content/Header';
import Section from '~/component/Content/Section';
import {BookBox} from '~/component/Content/BookBox';
import { DataContext } from './Context/DataContext';

function Content() {
    const data = useContext(DataContext);
    let section = [
        {
            sectionName: 'Books',
            data: {
                Reading: [],
                'To Read': [],
                Read: [],
            },
        },
        {
            sectionName: 'Quotes',
            data: {
                Favorite: [],
                'Recently Added': [],
                'All Books': [],
            },
        },
        {
            sectionName: 'Genres',
            data: {
                Gallery: [],
            },
        },
    ];

    function sortBookByOrderAdd(books) {
        for (let i = 0; i < books.length - 1; i++) {
            for (let j = i + 1; j < books.length; j++) {
                if (books[i].id > books[j].id) [books[i], books[j]] = [books[j], books[i]];
            }
        }
    }
 
    //Handle Data
    section[1].data['All Books'] = data;

    try {
        for (let i = 0; i < data.length; i++) {
            //Add reading,to read,read book
            section[0].data[data[i].status].push(data[i]);

            //Add Quote
            data[i].quote.map((e, index) => {
                section[1].data['Recently Added'].push({ ...e, name: data[i].name });
                if (e.favorite) section[1].data['Favorite'].push({ ...e, name: data[i].name });
            });

            //Add genres
            if (section[2].data['Gallery'].find((e) => e.genres.name == data[i].genres.name) == undefined)
                section[2].data['Gallery'].push({ genres: data[i].genres, count: 1 });
            else {
                for (let j = 0; j < section[2].data['Gallery'].length; j++) {
                    if (section[2].data['Gallery'][j].genres.name == data[i].genres.name)
                        section[2].data['Gallery'][j].count++;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }

    sortBookByOrderAdd(section[1].data['Recently Added']);
    //Swap posion in page
    [section[1],section[2]] = [section[2],section[1]]
    try {
        return (
            <DataContext.Provider value={data}>
                <Container>
                    {/* { Header } */}
                    <Header className="content__header"></Header>

                    {/* { Content } */}

                    {section.map((e, index) => {
                        return <Section 
                                  key={index} 
                                  sectionName={e.sectionName} 
                                  data={e.data}
                                ></Section>;
                    })}
                </Container>
            </DataContext.Provider>
        );
    } catch (error) {
        console.log(error);
    }
}

export { Content };
