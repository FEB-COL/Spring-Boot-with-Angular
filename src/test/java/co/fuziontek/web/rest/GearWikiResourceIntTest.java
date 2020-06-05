package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearWiki;
import co.fuziontek.repository.GearWikiRepository;
import co.fuziontek.service.GearWikiService;
import co.fuziontek.service.dto.GearWikiDTO;
import co.fuziontek.service.mapper.GearWikiMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearWikiResource REST controller.
 *
 * @see GearWikiResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearWikiResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_ID_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_ID_IMAGE = "BBBBBBBBBB";

    @Autowired
    private GearWikiRepository gearWikiRepository;

    @Autowired
    private GearWikiMapper gearWikiMapper;

    @Autowired
    private GearWikiService gearWikiService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearWikiMockMvc;

    private GearWiki gearWiki;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearWikiResource gearWikiResource = new GearWikiResource(gearWikiService);
        this.restGearWikiMockMvc = MockMvcBuilders.standaloneSetup(gearWikiResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearWiki createEntity(EntityManager em) {
        GearWiki gearWiki = new GearWiki()
            .title(DEFAULT_TITLE)
            .text(DEFAULT_TEXT)
            .idImage(DEFAULT_ID_IMAGE);
        return gearWiki;
    }

    @Before
    public void initTest() {
        gearWiki = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearWiki() throws Exception {
        int databaseSizeBeforeCreate = gearWikiRepository.findAll().size();

        // Create the GearWiki
        GearWikiDTO gearWikiDTO = gearWikiMapper.toDto(gearWiki);
        restGearWikiMockMvc.perform(post("/api/gear-wikis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearWikiDTO)))
            .andExpect(status().isCreated());

        // Validate the GearWiki in the database
        List<GearWiki> gearWikiList = gearWikiRepository.findAll();
        assertThat(gearWikiList).hasSize(databaseSizeBeforeCreate + 1);
        GearWiki testGearWiki = gearWikiList.get(gearWikiList.size() - 1);
        assertThat(testGearWiki.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testGearWiki.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testGearWiki.getIdImage()).isEqualTo(DEFAULT_ID_IMAGE);
    }

    @Test
    @Transactional
    public void createGearWikiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearWikiRepository.findAll().size();

        // Create the GearWiki with an existing ID
        gearWiki.setId(1L);
        GearWikiDTO gearWikiDTO = gearWikiMapper.toDto(gearWiki);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearWikiMockMvc.perform(post("/api/gear-wikis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearWikiDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearWiki in the database
        List<GearWiki> gearWikiList = gearWikiRepository.findAll();
        assertThat(gearWikiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearWikis() throws Exception {
        // Initialize the database
        gearWikiRepository.saveAndFlush(gearWiki);

        // Get all the gearWikiList
        restGearWikiMockMvc.perform(get("/api/gear-wikis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearWiki.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].idImage").value(hasItem(DEFAULT_ID_IMAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getGearWiki() throws Exception {
        // Initialize the database
        gearWikiRepository.saveAndFlush(gearWiki);

        // Get the gearWiki
        restGearWikiMockMvc.perform(get("/api/gear-wikis/{id}", gearWiki.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearWiki.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.idImage").value(DEFAULT_ID_IMAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearWiki() throws Exception {
        // Get the gearWiki
        restGearWikiMockMvc.perform(get("/api/gear-wikis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearWiki() throws Exception {
        // Initialize the database
        gearWikiRepository.saveAndFlush(gearWiki);

        int databaseSizeBeforeUpdate = gearWikiRepository.findAll().size();

        // Update the gearWiki
        GearWiki updatedGearWiki = gearWikiRepository.findById(gearWiki.getId()).get();
        // Disconnect from session so that the updates on updatedGearWiki are not directly saved in db
        em.detach(updatedGearWiki);
        updatedGearWiki
            .title(UPDATED_TITLE)
            .text(UPDATED_TEXT)
            .idImage(UPDATED_ID_IMAGE);
        GearWikiDTO gearWikiDTO = gearWikiMapper.toDto(updatedGearWiki);

        restGearWikiMockMvc.perform(put("/api/gear-wikis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearWikiDTO)))
            .andExpect(status().isOk());

        // Validate the GearWiki in the database
        List<GearWiki> gearWikiList = gearWikiRepository.findAll();
        assertThat(gearWikiList).hasSize(databaseSizeBeforeUpdate);
        GearWiki testGearWiki = gearWikiList.get(gearWikiList.size() - 1);
        assertThat(testGearWiki.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testGearWiki.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testGearWiki.getIdImage()).isEqualTo(UPDATED_ID_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearWiki() throws Exception {
        int databaseSizeBeforeUpdate = gearWikiRepository.findAll().size();

        // Create the GearWiki
        GearWikiDTO gearWikiDTO = gearWikiMapper.toDto(gearWiki);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearWikiMockMvc.perform(put("/api/gear-wikis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearWikiDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearWiki in the database
        List<GearWiki> gearWikiList = gearWikiRepository.findAll();
        assertThat(gearWikiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearWiki() throws Exception {
        // Initialize the database
        gearWikiRepository.saveAndFlush(gearWiki);

        int databaseSizeBeforeDelete = gearWikiRepository.findAll().size();

        // Get the gearWiki
        restGearWikiMockMvc.perform(delete("/api/gear-wikis/{id}", gearWiki.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearWiki> gearWikiList = gearWikiRepository.findAll();
        assertThat(gearWikiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearWiki.class);
        GearWiki gearWiki1 = new GearWiki();
        gearWiki1.setId(1L);
        GearWiki gearWiki2 = new GearWiki();
        gearWiki2.setId(gearWiki1.getId());
        assertThat(gearWiki1).isEqualTo(gearWiki2);
        gearWiki2.setId(2L);
        assertThat(gearWiki1).isNotEqualTo(gearWiki2);
        gearWiki1.setId(null);
        assertThat(gearWiki1).isNotEqualTo(gearWiki2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearWikiDTO.class);
        GearWikiDTO gearWikiDTO1 = new GearWikiDTO();
        gearWikiDTO1.setId(1L);
        GearWikiDTO gearWikiDTO2 = new GearWikiDTO();
        assertThat(gearWikiDTO1).isNotEqualTo(gearWikiDTO2);
        gearWikiDTO2.setId(gearWikiDTO1.getId());
        assertThat(gearWikiDTO1).isEqualTo(gearWikiDTO2);
        gearWikiDTO2.setId(2L);
        assertThat(gearWikiDTO1).isNotEqualTo(gearWikiDTO2);
        gearWikiDTO1.setId(null);
        assertThat(gearWikiDTO1).isNotEqualTo(gearWikiDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearWikiMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearWikiMapper.fromId(null)).isNull();
    }
}
